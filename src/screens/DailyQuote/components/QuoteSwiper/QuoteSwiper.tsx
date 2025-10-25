import type { QuoteCard as QuoteCardType } from "@models/quote";
import type { SwiperRef } from "@models/swiper";
import { QuoteCard } from "@screens/DailyQuote/components/QuoteCard/QuoteCard";
import { View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { styles } from "./styles.quoteswiper";

interface QuoteSwiperProps {
  swiperRef: React.RefObject<SwiperRef | null>;
  quotes: QuoteCardType[];
  onSwiped: (index: number) => void;
  onSwiping: () => void;
  canSwipe: boolean;
}

export const QuoteSwiper = ({
  swiperRef,
  quotes,
  onSwiped,
  onSwiping,
  canSwipe,
}: QuoteSwiperProps) => {
  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef as React.Ref<Swiper<QuoteCardType>>}
        cards={quotes}
        renderCard={(card) => <QuoteCard card={card} />}
        onSwiped={onSwiped}
        onSwiping={onSwiping}
        backgroundColor="transparent"
        stackSize={3}
        stackScale={10}
        stackSeparation={14}
        infinite
        showSecondCard
        animateCardOpacity
        verticalSwipe={false}
        horizontalSwipe={canSwipe}
        disableBottomSwipe
        disableTopSwipe
        cardVerticalMargin={0}
        cardHorizontalMargin={20}
        useViewOverflow={false}
        animateOverlayLabelsOpacity={false}
        containerStyle={styles.innerContainer}
      />
    </View>
  );
};
