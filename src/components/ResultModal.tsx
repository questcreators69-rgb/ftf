import {
  Clock,
  Flame,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import {
  Order,
  OrderValidationResult,
  RewardBreakdown,
  Recipe,
} from '../types';


interface ResultModalProps {
  isOpen: boolean;
  isExpired: boolean;
  order: Order;
  validation: OrderValidationResult;
  reward: RewardBreakdown;
  streak: number;
  educationalFact: string;
  discoveredRecipe?: Recipe | null;
  didLevelUp?: boolean;
  newLevel?: number;
  onNextOrder: () => void;
  onRetryOrder?: () => void;
}

export function ResultModal({
  isOpen,
  isExpired,
  order,
  validation,
  reward,
  streak,
  educationalFact,
  discoveredRecipe,
  didLevelUp,
  newLevel,
  onNextOrder,
  onRetryOrder,
}: ResultModalProps) {
  if (!isOpen) return null;

  const isSuccess = !isExpired && validation.isReady && !validation.hasHardViolation;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-stone-950/80 backdrop-blur-xs font-mono select-none">
      <div className="w-full max-w-md bg-[#FAF3DE] text-[#1E1B18] border-4 border-[#1A1612] shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
        <div className="absolute top-1.5 left-1.5 w-2 h-2 bg-[#614E3C] border border-[#30251B] z-10" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#614E3C] border border-[#30251B] z-10" />
        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 bg-[#614E3C] border border-[#30251B] z-10" />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 bg-[#614E3C] border border-[#30251B] z-10" />

        <div className={`p-3 text-white flex items-center justify-between border-b-3 ${
          isSuccess            ? 'bg-[#15803D] border-[#0F5127]'
            : 'bg-[#991B1B] border-[#5C0F0F]'
        }`}>
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-amber-200">
              TICKET #{order.orderNumber} • {order.customerName}
            </div>
            <h2 className="font-display font-black text-lg tracking-wide uppercase leading-tight text-white mt-0.5">
            {isSuccess
                ? 'ORDER FULFILLED!'
                : isExpired
                ? 'CUSTOMER TIMED OUT!'
                : 'ORDER REJECTED!'}
            </h2>          </div>
          <div className="px-2.5 py-1 bg-[#181614] border-2 border-[#EAB308] text-[#FACC15] font-display font-black text-base shadow-xs">
            {isSuccess ? `+₹${reward.total}` : '₹0'}
             </div>        </div>
        <div className="p-3.5 space-y-3 overflow-y-auto flex-1">
          {isSuccess && (
            <div className="bg-[#EFE5CF] border-2 border-[#DECBB0] p-2.5 space-y-1.5 text-xs">
              <div className="text-[10px] font-bold text-[#7A6C5B] uppercase border-b border-[#D8C7A9] pb-1">
                FARE BREAKDOWN
              </div>
              <div className="flex justify-between">
                <span>Base Fare:</span>
                <span className="font-bold">₹{reward.base}</span>
              </div>
              {reward.speedBonus > 0 && (
                <div className="flex justify-between text-emerald-800">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Speed Tip:</span>
                  </span>
                  <span className="font-bold">+₹{reward.speedBonus}</span>
                </div>
              )}
              {reward.perfectBonus > 0 && (
                <div className="flex justify-between text-amber-900">
                  <span>Accuracy Tip:</span>
                  <span className="font-bold">+₹{reward.perfectBonus}</span>
                </div>              )}
              {reward.streakBonus > 0 && (
                <div className="flex justify-between text-orange-900">
                <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3" />
                    <span>Streak Bonus:</span>
                  </span>
                  <span className="font-bold">+₹{reward.streakBonus}</span>
                </div>
              )}
              <div className="pt-1.5 border-t-2 border-[#DECBB0] flex justify-between font-display font-black text-sm">
                <span>TOTAL COLLECTED:</span>
                <span className="text-[#15803D]">₹{reward.total}</span>
              </div>
            </div>
          )}

          {didLevelUp && (
            <div className="bg-[#FDE047] border-2 border-[#CA8A04] p-2.5 text-center text-xs">
              <div className="font-display font-black text-sm text-[#713F12] uppercase">
                TRUCK UPGRADE UNLOCKED!
              </div>
              <div className="text-[11px] text-[#854D0E] font-bold mt-0.5">
                Advanced to Level {newLevel}! New ingredients unlocked!
              </div>
            </div>
          )}

          {discoveredRecipe && (
            <div className="bg-[#E9D5FF] border-2 border-[#C084FC] p-2.5 text-xs">
              <div className="flex items-center gap-1.5 text-purple-900 font-bold uppercase">
                <BookOpen className="w-3.5 h-3.5" />
                <span>SECRET FORMULA DISCOVERED!</span>
              </div>
              <div className="font-bold text-sm text-[#581C87] mt-0.5">
                {discoveredRecipe.name} (+₹{discoveredRecipe.bonus}
                )
              </div>
            </div>
          )}

          {educationalFact && (
            <div className="bg-[#FAF5E8] border border-[#DECBB0] p-2.5 text-[11px] text-[#524436]">
              <div className="text-[9px] font-bold text-[#8C7A65] uppercase">
                CHEF NUTRITION NOTE:
              </div>
              <div className="mt-0.5 font-bold leading-relaxed">{educationalFact}</div>
            </div>
          )}
        </div>
        <div className="p-3 bg-[#EFE5CF] border-t-2 border-[#DECBB0] flex items-center justify-between gap-2">
          {onRetryOrder && !isSuccess && (
            <button
              onClick={onRetryOrder}
              className="px-3 py-2 bg-[#2D2821] hover:bg-[#3D372E] text-[#EDE7DC] border-2 border-[#1A1612] font-bold text-xs cursor-pointer shadow-xs active:translate-y-0.5 uppercase"
            >
              TRY AGAIN
            </button>
          )}

          <button
            onClick={onNextOrder}
            className="flex-1 px-4 py-2.5 bg-[#15803D] hover:bg-[#16A34A] text-white border-2 border-[#0F5127] font-display font-black text-xs cursor-pointer shadow-xs flex items-center justify-center gap-1.5 active:translate-y-0.5 uppercase"
          >
            <span>TAKE NEXT CUSTOMER</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}