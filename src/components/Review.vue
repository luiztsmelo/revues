<template>
  <div class="review" @click="openModal">
    <header>
      <div class="sentiment" :class="sentimentClass"></div>

      <div class="details">
        <span class="reviewer">{{ review.reviewer }}</span>
        <span class="date">{{ review.date }} - {{ review.source }}</span>
      </div>

      <StarRating :score="review.score" />
    </header>

    <span class="text">{{ reviewText }}</span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import truncate from 'truncate'
import StarRating from '@/components/StarRating.vue'

export default Vue.extend({
  props: {
    review: { type: Object, required: true }
  },
  components: {
    StarRating
  },
  methods: {
    openModal () {
      alert('Ideia de abrir um modal com mais informações sobre a avaliação, e apresentar algumas ações.')
    }
  },
  computed: {
    sentimentClass (): string {
      if (this.review.sentiment === 'Positivo') {
        return 'sentiment-positive'
      } else if (this.review.sentiment === 'Neutro') {
        return 'sentiment-neutral'
      } else {
        return 'sentiment-negative'
      }
    },
    reviewText (): string {
      return truncate(this.review.text, 132)
    }
  }
})
</script>

<style lang="scss" scoped>
.review {
  cursor: pointer;
  background-color: $lightest_grey;
  border-radius: 12px;
  padding: 16px;
  background-color: #fff;

  &:hover {
    background-color: rgb(244,244,244);
  }

  header {
    display: grid;
    grid-template-columns: 46px 1fr auto;
    align-items: center;
    margin-bottom: 10px;

    .sentiment {
      width: 36px;
      height: 36px;
      mask-size: 36px 36px;
      border-radius: 50%;
    }

    .sentiment-positive {
      mask-image: url('../assets/images/positive_sentiment.svg');
      background-color: $green;
    }

    .sentiment-neutral {
      mask-image: url('../assets/images/neutral_sentiment.svg');
      background-color: $yellow;
      animation: animateSentimentNeutral 2s infinite ease;
    }

    .sentiment-negative {
      mask-image: url('../assets/images/negative_sentiment.svg');
      background-color: $red;
      animation: animateSentimentNegative 1.2s infinite ease;
    }

    @keyframes animateSentimentNeutral {
      0%   {transform: scale(0.8);}
      50%  {transform: scale(1.04);}
      100% {transform: scale(0.8);}
    }

    @keyframes animateSentimentNegative {
      0%   {transform: scale(0.7);}
      50%  {transform: scale(1.07);}
      100% {transform: scale(0.7);}
    }

    .details {
      display: grid;

      .reviewer {
        font-size: 13px;
        font-weight: 600;
        padding-bottom: 4px;
      }

      .date {
        font-size: 13px;
        font-weight: 400;
        color: $light_text;
      }
    }
  }

  .text {
    font-size: 13px;
  }

  span::first-letter {
    text-transform: uppercase;
  }
}
</style>
