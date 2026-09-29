import { Clock } from 'lucide-react';
import { Order, OrderValidationResult } from '../types';
import { i } from 'motion/react-client';
interface OrderTicketProps {
  order: Order;
  validation: OrderValidationResult;
  remainingSeconds: number;
}

export function OrderTicket({ order, validation, remainingSeconds }: OrderTicketProps) {
  const isCritical = remainingSeconds <= 7;
  const isWarning = remainingSeconds <= 15 && !isCritical;

  return (
    <div className="w-full flex flex-col items-center select-none font-mono text-xs">
      <div className="w-full bg-[#1F453D] border-3 border-[#102420] rounded-t-md p-1.5 relative shadow-md flex justify-center items-center">
        <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-[#121B19] border border-[#2F4F48]" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#121B19] border border-[#2F4F48]" />

        <div className="w-12 h-4 bg-[#2B2D30] border-2 border-[#151618] rounded-xs shadow-md flex items-center justify-center">
          <div className="w-2.5 h-1.5 rounded-full bg-[#111] border border-[#646870]" />
        </div>      </div>
      <div className="w-full bg-[#FAF3DE] text-[#1E1B18] border-3 border-[#102420] border-t-0 rounded-b-md shadow-xl relative pt-3 pb-3 px-3 flex flex-col gap-2">
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 bg-[#786D5E]" />
        <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#786D5E]" />
        <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 bg-[#786D5E]" />
        <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 bg-[#786D5E]" />

        <div className="flex items-start justify-between gap-1 border-b border-[#D88A75] pb-2">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#4A4237]">
              <span className="font-bold">TICKET #{order.orderNumber}</span>              <span>•</span>              <span className="font-bold text-[#991B1B]">{order.customerName}</span>            </div>            <div className="text-[10px] text-[#7A6C5B] font-bold mt-0.5">
              TARGET: {order.timeLimitSec}s max service
            </div>          </div>
          <div            className={`flex items-center gap-1 px-2.5 py-1 border-2 font-mono font-bold text-xs shadow-xs ${
              isCritical                / 'bg-[#B91C1C] border-[#7F1D1D] text-white animate-pulse'
                : isWarning
                / 'bg-[#EA580C] border-[#9A3412] text-white'
                : 'bg-[#15803D] border-[#166534] text-white'
          }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{remainingSeconds}s</span>          </div>        </div>
        <div className="space-y-1.5">
          <div className="text-[10px] text-[#786D5E] font-bold uppercase tracking-wider">
            CUSTOMER CRITERIA:
          </div>
          {validation.hardRuleStatuses.map(status => {
            const isSatisfied = status.isSatisfied;
            const isViolated = status.isViolated;

            return (
              <div                key={status.rule.id}
                className={`p-1.5 border-2 text-[11px] font-bold flex items-center justify-between gap-1.5 transition-colors ${
                  isViolated                    / 'bg-[#FEF2F2] border-[#EF4444] text-[#991B1B]'
                    : isSatisfied
                    / 'bg-[#ECFDF5] border-[#10B981] text-[#065F46]'
                    : 'bg-[#FFFBEB] border-[#F59E0B] text-[#92400E]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div                    className={`w-3.5 h-3.5 flex items-center justify-center text-[9px] font-black shrink-0 border ${
                      isViolated
                        / 'bg-[#EF4444] border-[#B91C1C] text-white'
     