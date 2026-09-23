'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Search, Printer, CheckCircle, CreditCard, Receipt as ReceiptIcon } from 'lucide-react';
import { formatINR, formatDateTime } from '@/lib/utils';

export default function CollectFeePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [student, setStudent] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedInvoice, setSelectedInvoice] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState('CASH');
  const [referenceNo, setReferenceNo] = useState('');
  const [bankName, setBankName] = useState('');
  const [chequeNo, setChequeNo] = useState('');
  const [remarks, setRemarks] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setLoading(true);
    setError('');
    setStudent(null);
    setInvoices([]);
    setReceiptData(null);

    try {
      const res = await fetch(`/api/fees/lookup?q=${encodeURIComponent(searchQuery)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.student) {
          setStudent(data.student);
          setInvoices(data.invoices || []);
          if (data.invoices && data.invoices.length > 0) {
            setSelectedInvoice(data.invoices[0].id);
            const pending = data.invoices[0].totalAmount - (data.invoices[0].paidAmount || 0);
            setAmount(pending.toString());
          }
        } else {
          setError('Student not found');
        }
      } else {
        setError('Error fetching student details');
      }
    } catch (e) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!student || !amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/admin/fees/collect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: student.id,
          invoiceId: selectedInvoice || undefined,
          amount: parseFloat(amount),
          paymentMethod: paymentMode,
          referenceNo,
          bankName,
          chequeNo,
          remarks
        })
      });

      const data = await res.json();
      if (res.ok) {
        setReceiptData(data.receipt);
      } else {
        setError(data.error || 'Failed to process payment');
      }
    } catch (e) {
      setError('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto print:p-0">
        <h1 className="text-2xl font-bold text-brand-950 mb-6 print:hidden">Offline Fee Collection Desk</h1>

        {!receiptData && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:hidden">
            {/* Left Column: Search & Details */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Search Student</h2>
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Admission No or Name"
                    className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-brand-950 focus:border-brand-950"
                  />
                  <button type="submit" disabled={loading} className="bg-brand-950 text-white p-2 rounded-md hover:bg-brand-800">
                    <Search size={20} />
                  </button>
                </form>
                {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
              </div>

              {student && (
                <div className="bg-white rounded-lg shadow p-6 border-t-4 border-emerald-600">
                  <h3 className="font-bold text-lg mb-2">{student.firstName} {student.lastName}</h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p><span className="font-medium text-gray-900">Admission No:</span> {student.admissionNo}</p>
                    <p><span className="font-medium text-gray-900">Class:</span> {student.class?.name} {student.section?.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Invoices & Payment Form */}
            <div className="lg:col-span-2">
              {student && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CreditCard size={20} className="text-brand-950" /> Payment Details
                  </h2>
                  
                  {invoices.length > 0 ? (
                    <form onSubmit={handleSubmitPayment} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Pending Invoice</label>
                        <select 
                          value={selectedInvoice} 
                          onChange={(e) => {
                            setSelectedInvoice(e.target.value);
                            const inv = invoices.find(i => i.id === e.target.value);
                            if(inv) setAmount((inv.totalAmount - (inv.paidAmount || 0)).toString());
                          }}
                          className="w-full border border-gray-300 rounded-md p-2"
                        >
                          {invoices.map(inv => (
                            <option key={inv.id} value={inv.id}>
                              {inv.title} - Due: {formatINR(inv.totalAmount - (inv.paidAmount || 0))} (Total: {formatINR(inv.totalAmount)})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Collect (₹)</label>
                          <input 
                            type="number" 
                            step="0.01" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 font-bold text-lg"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
                          <select 
                            value={paymentMode} 
                            onChange={(e) => setPaymentMode(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2"
                          >
                            <option value="CASH">Cash</option>
                            <option value="UPI">UPI</option>
                            <option value="CHEQUE">Cheque</option>
                            <option value="BANK_TRANSFER">Bank Transfer</option>
                          </select>
                        </div>
                      </div>

                      {paymentMode !== 'CASH' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {paymentMode === 'CHEQUE' ? (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Cheque No</label>
                                <input type="text" value={chequeNo} onChange={e => setChequeNo(e.target.value)} className="w-full border p-2 rounded-md" required />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                                <input type="text" value={bankName} onChange={e => setBankName(e.target.value)} className="w-full border p-2 rounded-md" required />
                              </div>
                            </>
                          ) : (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Ref No</label>
                              <input type="text" value={referenceNo} onChange={e => setReferenceNo(e.target.value)} className="w-full border p-2 rounded-md" required />
                            </div>
                          )}
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Remarks (Optional)</label>
                        <input type="text" value={remarks} onChange={e => setRemarks(e.target.value)} className="w-full border p-2 rounded-md" />
                      </div>

                      <div className="flex justify-end pt-4 border-t">
                        <button 
                          type="submit" 
                          disabled={submitting}
                          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-md font-bold hover:bg-emerald-700 disabled:opacity-50"
                        >
                          {submitting ? 'Processing...' : `Collect ${amount ? formatINR(parseFloat(amount)) : ''}`}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircle size={48} className="mx-auto text-emerald-500 mb-4" />
                      <p className="text-lg font-medium">No pending invoices</p>
                      <p>This student has cleared all dues.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Receipt View */}
        {receiptData && (
          <div className="bg-white max-w-2xl mx-auto rounded-lg shadow-lg overflow-hidden border print:shadow-none print:border-none">
            <div className="bg-brand-950 p-6 text-white text-center print:bg-gray-100 print:text-black print:border-b">
              <h2 className="text-2xl font-bold uppercase tracking-widest">SARS School</h2>
              <p className="opacity-80 print:opacity-100">Official Fee Receipt</p>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start border-b pb-6">
                <div>
                  <p className="text-sm text-gray-500">Receipt No</p>
                  <p className="font-bold text-lg">{receiptData.receiptNumber}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-bold">{formatDateTime(receiptData.createdAt)}</p>
                </div>
              </div>
              
              <div className="border-b pb-6">
                <p className="text-sm text-gray-500 mb-2">Received from</p>
                <p className="font-bold text-xl">{student?.firstName} {student?.lastName}</p>
                <p className="text-gray-600">Admission No: {student?.admissionNo}</p>
              </div>

              <div className="flex justify-between items-center border-b pb-6">
                <div>
                  <p className="text-sm text-gray-500">Payment Mode</p>
                  <p className="font-semibold">{paymentMode}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Amount</p>
                  <p className="font-bold text-2xl text-emerald-600 print:text-black">{formatINR(parseFloat(amount))}</p>
                </div>
              </div>

              <div className="pt-4 flex flex-col items-center">
                <p className="text-xs text-gray-400 mb-2">Scan to verify</p>
                {/* Placeholder for real QR code */}
                <div className="w-24 h-24 bg-gray-200 border flex items-center justify-center">
                  <span className="text-xs text-gray-500">QR Code</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 break-all">{receiptData.verificationHash}</p>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 flex justify-center gap-4 print:hidden">
              <button onClick={() => { setReceiptData(null); setSearchQuery(''); setStudent(null); }} className="px-6 py-2 border rounded-md">New Payment</button>
              <button onClick={handlePrintReceipt} className="px-6 py-2 bg-brand-950 text-white flex items-center gap-2 rounded-md">
                <Printer size={18} /> Print Receipt
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
