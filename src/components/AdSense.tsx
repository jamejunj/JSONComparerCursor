import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
}

const AdContainer = styled.div`
  width: 100%;
  min-height: 100px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-secondary);
  border-radius: 4px;
  overflow: hidden;
`;

const AdSense = ({ slot, format = 'auto', style }: AdSenseProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const adLoaded = useRef(false);

  useEffect(() => {
    if (!adLoaded.current && adRef.current) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adLoaded.current = true;
      } catch (error) {
        console.error('Error loading AdSense:', error);
      }
    }

    // Cleanup function
    return () => {
      if (adRef.current) {
        const ins = adRef.current.querySelector('ins.adsbygoogle');
        if (ins) {
          ins.remove();
        }
      }
    };
  }, []);

  return (
    <AdContainer ref={adRef} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '320px', minHeight: '100px' }}
        data-ad-client="ca-pub-3687951221764937"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </AdContainer>
  );
};

export default AdSense; 