import { useEffect, useRef, useState } from "react";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const SWIPE_ANIMATION_DURATION = 500;
const SWIPE_COOLDOWN = 800;

interface UseSwipeManagerParams {
  onIndexChange: (newIndex: number) => void;
  shouldPreload: (index: number) => boolean;
  onPreload: () => void;
}

interface UseSwipeManagerReturn {
  isSwiping: boolean;
  handleSwiped: (index: number) => void;
  handleSwiping: () => void;
}

export const useSwipeManager = ({
  onIndexChange,
  shouldPreload,
  onPreload,
}: UseSwipeManagerParams): UseSwipeManagerReturn => {
  const [isSwiping, setIsSwiping] = useState(false);
  const swipeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSwipeTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (swipeTimeoutRef.current) {
        clearTimeout(swipeTimeoutRef.current);
      }
    };
  }, []);

  const handleSwiped = (index: number) => {
    const now = Date.now();
    const timeSinceLastSwipe = now - lastSwipeTimeRef.current;

    if (timeSinceLastSwipe < SWIPE_COOLDOWN) return;

    lastSwipeTimeRef.current = now;
    setIsSwiping(true);

    ReactNativeHapticFeedback.trigger("impactLight");
    onIndexChange(index + 1);

    if (shouldPreload(index)) {
      onPreload();
    }

    if (swipeTimeoutRef.current) {
      clearTimeout(swipeTimeoutRef.current);
    }

    swipeTimeoutRef.current = setTimeout(() => {
      setIsSwiping(false);
    }, SWIPE_ANIMATION_DURATION);
  };

  const handleSwiping = () => {
    setIsSwiping(true);
  };

  return {
    isSwiping,
    handleSwiped,
    handleSwiping,
  };
};
