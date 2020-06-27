<template>
  <div id="reviews">
    <div class="review" v-for="(review, index) in $store.state.reviews.reverse().slice(0, 20)" :key="index">
      <header>
        <div class="sentiment" :class="review.sentiment === 'Positivo' ? 'sentiment-positive' : 'sentiment-negative'"></div>

        <div class="details">
          <span class="reviewer">{{ review.reviewer }}</span>
          <span class="date">{{ review.date }}</span>
        </div>

        <StarRating :score="review.score" />
      </header>

      <span class="text">{{ review.text }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import StarRating from '@/components/StarRating.vue'

export default Vue.extend({
  name: 'reviews',
  components: {
    StarRating
  }
})
</script>

<style lang="scss" scoped>
#reviews {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 160px;
  grid-gap: 22px;

  .review {
    cursor: pointer;
    background-color: $light_grey;
    border-radius: 12px;
    padding: 16px;
    transition: transform .2s ease-out;

    &:hover {
      transform: scale(1.02);
    }

    header {
      display: grid;
      grid-template-columns: 50px 1fr auto;
      border-bottom: 1px solid #dedede;
      padding-bottom: 10px;
      margin-bottom: 10px;

      .sentiment {
        width: 38px;
        height: 38px;
        mask-size: 38px 38px;
        border-radius: 50%;
      }

      .sentiment-positive {
        mask-image: url('../../assets/images/positive_sentiment.svg');
        background-color: $green;
      }

      .sentiment-negative {
        mask-image: url('../../assets/images/negative_sentiment.svg');
        background-color: $red;
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
  }
}
</style>
