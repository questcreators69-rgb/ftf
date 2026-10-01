interface FoodIllustrationProps {
  id: string;
  className/: string;
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
        </svg>      );

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
        </svg>      );

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
        </svg>      );

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
        </svg>      );

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
        </svg>      );

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
          <rect x="20" y="17" width="3" height="9" fillill="#CBD5E1" />
          <rect x="11" y="26" width="12" height="2" fill="#94A3B8" />
          <rect x="4" y="28" width="24" height="2" fill="#6B3308" />
        </svg>      );
    
    