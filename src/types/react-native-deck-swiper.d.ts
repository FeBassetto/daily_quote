declare module "react-native-deck-swiper" {
  import type { Component } from "react";
  import type { ViewStyle } from "react-native";

  export interface SwiperProps<T> {
    cards: T[];
    renderCard: (card: T) => React.ReactElement | null;
    keyExtractor?: (card: T) => string;
    onSwiped?: (cardIndex: number) => void;
    onSwiping?: () => void;
    onSwipedAborted?: () => void;
    backgroundColor?: string;
    stackSize?: number;
    stackScale?: number;
    stackSeparation?: number;
    infinite?: boolean;
    showSecondCard?: boolean;
    animateCardOpacity?: boolean;
    verticalSwipe?: boolean;
    horizontalSwipe?: boolean;
    disableBottomSwipe?: boolean;
    disableTopSwipe?: boolean;
    cardVerticalMargin?: number;
    cardHorizontalMargin?: number;
    useViewOverflow?: boolean;
    animateOverlayLabelsOpacity?: boolean;
    containerStyle?: ViewStyle;
  }

  export default class Swiper<T> extends Component<SwiperProps<T>> {
    swipeLeft?: () => void;
    swipeRight?: () => void;
    swipeTop?: () => void;
    swipeBottom?: () => void;
  }
}
