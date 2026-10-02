interface FoodIllustrationProps {
  id: string;
  className?: string;
}

export function FoodIllustration({ id, className = 'w-10 h-10' }: FoodIllustrationProps) {
  switch (id) {
    case 'basmati-rice':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="7" y="18" width="18" height="8" fill="#582900" />
          <rect x="9" y="26" width="14" height="2" fill="#3D1C02" />
          <rect x="5" y="16" width="22" height="3" fill="#6B3308" />
          <rect x="6" y="12" width="20" height="5" fill="#FAF6EE" />
          <rect x="8" y="9" width="16" height="4" fill="#FFFFFF" />
          <rect x="11" y="7" width="10" height="3" fill="#FFFFFF" />
          <rect x="13" y="5" width="6" height="2" fill="#EDE6DC" />
          <rect x="9" y="11" width="2" height="1" fill="#D3C9BC" />
          <rect x="15" y="9" width="2" height="1" fill="#D3C9BC" />
          <rect x="20" y="12" width="2" height="1" fill="#D3C9BC" />
          <rect x="13" y="14" width="3" height="1" fill="#D3C9BC" />
        </svg>
      );

    case 'whole-wheat-roti':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="7" y="19" width="18" height="5" fill="#995E1B" />
          <rect x="6" y="15" width="20" height="5" fill="#BF7C2A" />
          <rect x="5" y="11" width="22" height="5" fill="#DFA14C" />
          <rect x="6" y="9" width="20" height="4" fill="#E8B56A" />
          <rect x="8" y="8" width="16" height="2" fill="#E8B56A" />
          <rect x="10" y="10" width="2" height="2" fill="#8A4A0A" />
          <rect x="18" y="10" width="2" height="1" fill="#8A4A0A" />
          <rect x="14" y="12" width="2" height="2" fill="#8A4A0A" />
          <rect x="21" y="12" width="2" height="2" fill="#8A4A0A" />
          <rect x="9" y="13" width="2" height="1" fill="#8A4A0A" />
          <rect x="16" y="14" width="2" height="1" fill="#8A4A0A" />
        </svg>
      );

    case 'quinoa-bowl':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="7" y="17" width="18" height="8" fill="#713F12" />
          <rect x="9" y="25" width="14" height="2" fill="#451A03" />
          <rect x="5" y="15" width="22" height="3" fill="#854D0E" />
          <rect x="7" y="11" width="18" height="5" fill="#FEF08A" />
          <rect x="10" y="8" width="12" height="4" fill="#FDE047" />
          <rect x="10" y="10" width="1" height="1" fill="#A16207" />
          <rect x="14" y="9" width="1" height="1" fill="#A16207" />
          <rect x="17" y="11" width="1" height="1" fill="#A16207" />
          <rect x="12" y="13" width="1" height="1" fill="#A16207" />
          <rect x="19" y="12" width="1" height="1" fill="#A16207" />
        </svg>
      );

    case 'hakka-noodles':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="7" y="17" width="18" height="8" fill="#451A03" />
          <rect x="9" y="25" width="14" height="2" fill="#291002" />
          <rect x="5" y="15" width="22" height="3" fill="#78350F" />
          <rect x="7" y="11" width="18" height="5" fill="#FEF9C3" />
          <rect x="9" y="8" width="14" height="4" fill="#FEF08A" />
          <rect x="10" y="9" width="6" height="1" fill="#EAB308" />
          <rect x="15" y="11" width="8" height="1" fill="#EAB308" />
          <rect x="8" y="12" width="6" height="1" fill="#CA8A04" />
          <rect x="14" y="13" width="7" height="1" fill="#CA8A04" />
          <rect x="12" y="10" width="2" height="2" fill="#15803D" />
          <rect x="18" y="12" width="2" height="2" fill="#15803D" />
        </svg>
      );

    case 'multigrain-wrap':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="8" y="10" width="16" height="14" fill="#FDE68A" />
          <rect x="7" y="12" width="18" height="10" fill="#FDE68A" />
          <rect x="10" y="8" width="12" height="18" fill="#FDE68A" />
          <rect x="11" y="9" width="3" height="3" fill="#15803D" />
          <rect x="15" y="8" width="3" height="3" fill="#EF4444" />
        <rect x="13" y="11" width="4" height="3" fill="#FFFFFF" />
          <rect x="10" y="14" width="12" height="2" fill="#D97706" />
          <rect x="8" y="19" width="16" height="2" fill="#CA8A04" />
          <rect x="12" y="17" width="2" height="2" fill="#78350F" />
        </svg>
      );

    case 'fresh-paneer':
    return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="5" y="13" width="9" height="9" fill="#FFFFFF" />
          <rect x="14" y="13" width="3" height="9" fill="#D9DFE8" />
          <rect x="5" y="22" width="12" height="2" fill="#B1BCCD" />
          <rect x="15" y="8" width="9" height="9" fill="#FFFFFF" />
          <rect x="24" y="8" width="3" height="9" fill="#D9DFE8" />
          <rect x="15" y="17" width="12" height="2" fill="#B1BCCD" />
          <rect x="11" y="17" width="9" height="9" fill="#FFFFFF" />
          <rect x="20" y="17" width="3" height="9" fill="#CBD5E1" />
          <rect x="11" y="26" width="12" height="2" fill="#94A3B8" />
          <rect x="4" y="28" width="24" height="2" fill="#6B3308" />
        </svg>
      );

    case 'roasted-chickpeas':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispedges">
          <rect x="6" y="17" width="20" height="8" fill="#582900" />
          <rect x="8" y="25" width="16" height="2" fill="#3d1c02" />
          <rect x="5" y="15" width="22" height="3" fill="#6b3308" />
          <circle cx="10" cy="13" r="3" fill="#d97706" />
          <circle cx="16" cy="11" r="3.5" fill="#f59e0b" />
          <circle cx="22" cy="13" r="3" fill="#b45309" />
          <circle cx="13" cy="14" r="3" fill="#f59e0b" />
          <circle cx="19" cy="14" r="3" fill="#d97706" />
          <rect x="11" y="12" width="1" height="1" fill="#78350f" />
          <rect x="17" y="10" width="1" height="1" fill="#78350f" />
        </svg>
      );

    case 'firm-tofu':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispedges">
          <rect x="7" y="12" width="15" height="12" fill="#f8fafc" />
          <rect x="22" y="12" width="4" height="12" fill="#cbd5e1" />
          <rect x="7" y="24" width="19" height="3" fill="#94a3b8" />
          <rect x="8" y="14" width="13" height="3" fill="#d97706" />
          <rect x="8" y="19" width="13" height="2" fill="#d97706" />
          <rect x="5" y="27" width="22" height="2" fill="#475569" />
        </svg>
      );

    case 'grilled-chicken':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispedges">
          <rect x="6" y="14" width="20" height="9" fill="#ea580c" />
          <rect x="8" y="11" width="16" height="14" fill="#ea580c" />
          <rect x="9" y="13" width="2" height="10" fill="#7c2d12" />
          <rect x="15" y="12" width="2" height="12" fill="#7c2d12" />
          <rect x="21" y="13" width="2" height="10" fill="#7c2d12" />
          <rect x="12" y="15" width="2" height="4" fill="#fed7aa" />
          <rect x="18" y="16" width="2" height="4" fill="#fed7aa" />
          <rect x="7" y="23" width="18" height="2" fill="#431407" />
        </svg>
      );

    case 'boiled-eggs':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispedges">
          <ellipse cx="11" cy="18" rx="6" ry="8" fill="#ffffff" />
          <circle cx="11" cy="19" r="3.5" fill="#facc15" />
          <circle cx="10" cy="18" r="1" fill="#fef08a" />
          <ellipse cx="21" cy="18" rx="6" ry="8" fill="#ffffff" />
          <circle cx="21" cy="19" r="3.5" fill="#facc15" />
          <circle cx="20" cy="18" r="1" fill="#fef08a" />
          <rect x="5" y="26" width="22" height="2" fill="#cbd5e1" />
        </svg>
      );

    case 'seared-fish':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispedges">
          <rect x="6" y="14" width="20" height="8" fill="#fb923c" />
          <rect x="8" y="12" width="15" height="12" fill="#f97316" />
          <rect x="23" y="15" width="4" height="6" fill="#ea580c" />
          <rect x="10" y="14" width="2" height="8" fill="#7c2d12" />
          <rect x="15" y="14" width="2" height="8" fill="#7c2d12" />
          <rect x="20" y="14" width="2" height="8" fill="#7c2d12" />
          <rect x="7" y="22" width="18" height="2" fill="#c2410c" />
          <polygon points="10,8 14,12 8,12" fill="#facc15" />
        </svg>
      );

    case 'sauteed-spinach':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispedges">
          <rect x="6" y="18" width="20" height="7" fill="#14532d" />
          <rect x="8" y="13" width="16" height="10" fill="#166534" />
          <rect x="10" y="10" width="12" height="6" fill="#15803d" />
          <circle cx="12" cy="14" r="1.5" fill="#fef08a" />
          <circle cx="18" cy="16" r="1.5" fill="#fef08a" />
          <circle cx="15" cy="12" r="1.5" fill="#fef08a" />
          <rect x="7" y="24" width="18" height="2" fill="#052e16" />
        </svg>
      );

    case 'roasted-tomatoes':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispedges">
          <circle cx="11" cy="18" r="6" fill="#dc2626" />
          <rect x="10" y="11" width="2" height="2" fill="#15803d" />
          <rect x="9" y="16" width="2" height="2" fill="#7f1d1d" />
          <circle cx="21" cy="18" r="6" fill="#ef4444" />
          <rect x="20" y="11" width="2" height="2" fill="#15803d" />
          <rect x="19" y="16" width="2" height="2" fill="#7f1d1d" />
          <rect x="6" y="24" width="20" height="2" fill="#991b1b" />
        </svg>
      );
    
    case 'charred-peppers':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="8" y="12" width="5" height="12" fill="#EA580C" />
          <rect x="14" y="10" width="5" height="14" fill="#F97316" />
          <rect x="20" y="13" width="5" height="11" fill="#EAB308" />
          <rect x="9" y="16" width="3" height="2" fill="#431407" />
          <rect x="15" y="15" width="3" height="2" fill="#431407" />
          <rect x="21" y="17" width="3" height="2" fill="#431407" />
          <rect x="9" y="9" width="3" height="2" fill="#15803D" />
          <rect x="15" y="7" width="3" height="2" fill="#15803D" />
        </svg>
      );

    case 'steamed-broccoli':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="14" y="18" width="4" height="8" fill="#86EFAC" />
          <rect x="13" y="24" width="6" height="3" fill="#4ADE80" />
          <rect x="10" y="9" width="12" height="10" fill="#16A34A" />
          <rect x="8" y="11" width="16" height="6" fill="#15803D" />
          <rect x="12" y="7" width="8" height="12" fill="#22C55E" />
          <rect x="11" y="9" width="2" height="2" fill="#DCFCE7" />
          <rect x="17" y="11" width="2" height="2" fill="#DCFCE7" />
        </svg>
      );

    case 'sweet-corn':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="10" y="9" width="12" height="14" fill="#FACC15" />
          <rect x="8" y="11" width="16" height="10" fill="#EAB308" />
          <rect x="10" y="11" width="2" height="2" fill="#FEF08A" />
          <rect x="14" y="11" width="2" height="2" fill="#FEF08A" />
          <rect x="18" y="11" width="2" height="2" fill="#FEF08A" />
          <rect x="12" y="15" width="2" height="2" fill="#FEF08A" />
          <rect x="16" y="15" width="2" height="2" fill="#FEF08A" />
          <rect x="10" y="19" width="2" height="2" fill="#FEF08A" />
          <rect x="14" y="19" width="2" height="2" fill="#FEF08A" />
          <rect x="7" y="21" width="5" height="5" fill="#15803D" />
          <rect x="20" y="21" width="5" height="5" fill="#15803D" />
        </svg>
      );

    case 'fresh-herbs':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="15" y="12" width="2" height="14" fill="#14532D" />
          <circle cx="12" cy="13" r="4" fill="#22C55E" />
          <circle cx="20" cy="13" r="4" fill="#16A34A" />
          <circle cx="16" cy="9" r="4" fill="#4ADE80" />
          <circle cx="11" cy="19" r="3.5" fill="#15803D" />
          <circle cx="21" cy="19" r="3.5" fill="#22C55E" />
        </svg>
      );

    case 'artisanal-cheese':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <polygon points="6,24 26,24 22,12 12,12" fill="#FACC15" />
          <rect x="6" y="22" width="20" height="3" fill="#EAB308" />
          <circle cx="14" cy="18" r="1.5" fill="#CA8A04" />
          <circle cx="19" cy="16" r="1.2" fill="#CA8A04" />
          <circle cx="10" cy="20" r="1.2" fill="#CA8A04" />
        </svg>
      );

    case 'toasted-seeds':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="7" y="18" width="18" height="7" fill="#713F12" />
          <rect x="5" y="16" width="22" height="3" fill="#854D0E" />
          <ellipse cx="11" cy="14" rx="2" ry="3" fill="#65A30D" />
          <ellipse cx="16" cy="13" rx="2" ry="3" fill="#FEF08A" />
          <ellipse cx="21" cy="14" rx="2" ry="3" fill="#65A30D" />
          <ellipse cx="13" cy="15" rx="1.5" ry="2" fill="#FEF08A" />
          <ellipse cx="18" cy="15" rx="1.5" ry="2" fill="#65A30D" />
        </svg>
      );

    case 'sliced-avocado':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <ellipse cx="16" cy="16" rx="9" ry="11" fill="#14532D" />
          <ellipse cx="16" cy="16" rx="7" ry="9" fill="#84CC16" />
          <ellipse cx="16" cy="16" rx="5" ry="7" fill="#BEF264" />
          <circle cx="16" cy="18" r="3.5" fill="#713F12" />
          <circle cx="15" cy="17" r="1" fill="#A16207" />
        </svg>
      );

    case 'crushed-peanuts':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="7" y="18" width="18" height="7" fill="#78350F" />
          <rect x="5" y="16" width="22" height="3" fill="#92400E" />
          <circle cx="11" cy="13" r="2.5" fill="#D97706" />
          <circle cx="16" cy="12" r="2.5" fill="#F59E0B" />
          <circle cx="21" cy="13" r="2.5" fill="#D97706" />
          <circle cx="13" cy="15" r="2" fill="#B45309" />
          <circle cx="18" cy="15" r="2" fill="#F59E0B" />
        </svg>      
      );
    
    case 'tomato-masala':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="7" y="17" width="18" height="8" fill="#450A0A" />
          <rect x="5" y="15" width="22" height="3" fill="#7F1D1D" />
          <rect x="7" y="12" width="18" height="4" fill="#DC2626" />
          <rect x="9" y="10" width="14" height="3" fill="#EF4444" />
          <circle cx="16" cy="11" r="2" fill="#F97316" />
          <rect x="14" y="9" width="4" height="2" fill="#15803D" />
        </svg>
      );

    case 'mint-yogurt':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="7" y="17" width="18" height="8" fill="#064E3B" />
          <rect x="5" y="15" width="22" height="3" fill="#047857" />
          <rect x="7" y="12" width="18" height="4" fill="#D1FAE5" />
          <rect x="9" y="10" width="14" height="3" fill="#ECFDF5" />
          <circle cx="14" cy="11" r="1.5" fill="#10B981" />
          <circle cx="18" cy="12" r="1.5" fill="#059669" />
        </svg>
      );

    case 'smoky-chili':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <path d="M10 24C10 24 12 10 22 8C22 8 20 22 14 24H10Z" fill="#DC2626" />
          <path d="M12 22C13 18 16 11 20 9" stroke="#7F1D1D" strokeWidth="2" />
          <rect x="21" y="6" width="3" height="4" fill="#15803D" />
          <rect x="23" y="4" width="2" height="3" fill="#16A34A" />
        </svg>
      );

    case 'creamy-hummus':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="7" y="17" width="18" height="8" fill="#713F12" />
          <rect x="5" y="15" width="22" height="3" fill="#854D0E" />
          <rect x="7" y="12" width="18" height="4" fill="#FEF08A" />
          <rect x="9" y="10" width="14" height="3" fill="#FEF9C3" />
          <ellipse cx="16" cy="11" rx="4" ry="1.5" fill="#CA8A04" />
          <circle cx="16" cy="11" r="1" fill="#DC2626" />
        </svg>
      );

    case 'peanut-satay':
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="7" y="17" width="18" height="8" fill="#451A03" />
          <rect x="5" y="15" width="22" height="3" fill="#78350F" />
          <rect x="7" y="12" width="18" height="4" fill="#B45309" />
          <rect x="9" y="10" width="14" height="3" fill="#D97706" />
          <circle cx="13" cy="11" r="1" fill="#FEF3C7" />
          <circle cx="17" cy="12" r="1" fill="#FEF3C7" />
          <circle cx="19" cy="11" r="1" fill="#FEF3C7" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 32 32" className={className} shapeRendering="crispEdges">
          <rect x="6" y="14" width="20" height="10" fill="#582900" />
          <rect x="8" y="22" width="16" height="3" fill="#3D1C02" />
          <circle cx="16" cy="14" r="6" fill="#F59E0B" />
          <rect x="14" y="12" width="2" height="2" fill="#FEF3C7" />
          <rect x="17" y="15" width="2" height="2" fill="#D97706" />
        </svg>
      );
  }
}
    
    