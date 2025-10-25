import { useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";

const SWIPE_ANIMATION_DURATION = 500;

interface UseSwipeManagerParams {
  onIndexChange: (newIndex: number) => void;
  shouldPreload: (index: number) => boolean;
  onPreload: () => void;
}

interface UseSwipeManagerReturn {
  isSwiping: boolean;
  canSwipe: boolean;
  handleSwiped: (index: number) => void;
  handleSwiping: () => void;
  handleSwipeAborted: () => void;
}

export const useSwipeManager = ({
  onIndexChange,
  shouldPreload,
  onPreload,
}: UseSwipeManagerParams): UseSwipeManagerReturn => {
  const [isSwiping, setIsSwiping] = useState(false);
  const [canSwipe, setCanSwipe] = useState(true);
  const swipeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active" && isSwiping) {
        setIsSwiping(false);
        setCanSwipe(true);
        if (swipeTimeoutRef.current) {
          clearTimeout(swipeTimeoutRef.current);
        }
      }
    });

    return () => {
      subscription.remove();
      if (swipeTimeoutRef.current) {
        clearTimeout(swipeTimeoutRef.current);
      }
    };
  }, [isSwiping]);

  const handleSwiped = (index: number) => {
    if (!canSwipe) return;

    setIsSwiping(true);
    setCanSwipe(false);

    ReactNativeHapticFeedback.trigger("impactLight");

    requestIdleCallback(() => {
      onIndexChange(index + 1);

      if (shouldPreload(index)) {
        onPreload();
      }
    });

    if (swipeTimeoutRef.current) {
      clearTimeout(swipeTimeoutRef.current);
    }

    swipeTimeoutRef.current = setTimeout(() => {
      setIsSwiping(false);
      setCanSwipe(true);
    }, SWIPE_ANIMATION_DURATION);
  };

  const handleSwiping = () => {
    if (swipeTimeoutRef.current) {
      clearTimeout(swipeTimeoutRef.current);
    }
    setIsSwiping(true);
  };

  const handleSwipeAborted = () => {
    if (swipeTimeoutRef.current) {
      clearTimeout(swipeTimeoutRef.current);
    }
    setIsSwiping(false);
    setCanSwipe(true);
  };

  return {
    isSwiping,
    canSwipe,
    handleSwiped,
    handleSwiping,
    handleSwipeAborted,
  };
};
