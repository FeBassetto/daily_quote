import type { QuoteCard as QuoteCardType } from "@models/quote";
import type { SwiperRef } from "@models/swiper";
import { QuoteCard } from "@screens/DailyQuote/components/QuoteCard/QuoteCard";
import { View } from "react-native";
import type Swiper from "react-native-deck-swiper";
import SwiperComponent from "react-native-deck-swiper";
import { styles } from "./styles.quoteswiper";

interface QuoteSwiperProps {
  swiperRef: React.RefObject<SwiperRef | null>;
  quotes: QuoteCardType[];
  onSwiped: (index: number) => void;
  onSwiping: () => void;
  onSwipedAborted: () => void;
  canSwipe: boolean;
}

export const QuoteSwiper = ({
  swiperRef,
  quotes,
  onSwiped,
  onSwiping,
  onSwipedAborted,
  canSwipe,
}: QuoteSwiperProps) => {
  return (
    <View style={styles.container}>
      <SwiperComponent
        ref={swiperRef as React.Ref<Swiper<QuoteCardType>>}
        cards={quotes}
        renderCard={(card: QuoteCardType) => <QuoteCard card={card} />}
        keyExtractor={(card: QuoteCardType) => card.id}
        onSwiped={onSwiped}
        onSwiping={onSwiping}
        onSwipedAborted={onSwipedAborted}
        backgroundColor="transparent"
        stackSize={3}
        stackScale={10}
        stackSeparation={14}
        infinite
        showSecondCard
        animateCardOpacity={false}
        verticalSwipe={false}
        horizontalSwipe={canSwipe}
        disableBottomSwipe
        disableTopSwipe
        cardVerticalMargin={0}
        cardHorizontalMargin={20}
        useViewOverflow={true}
        animateOverlayLabelsOpacity={false}
        containerStyle={styles.innerContainer}
      />
    </View>
  );
};
