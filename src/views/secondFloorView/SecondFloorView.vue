<script setup>
import {myStore} from "@/helpers/common-api.js";

const store = myStore();

const props = defineProps({
  active: Boolean,
  selectedChair: {
    type: Object,
    default: () => {
    },
  },
  scene: Number,
});
</script>

<template>
  <div class="floor">
    <div class="floor__canvas">
      <div class="floor__canvas-visual">
        <svg
            viewBox="0 0 1920 953"
            preserveAspectRatio="xMidYMid slice"
            class="mask"
        >
          <image
              v-if="props.scene === 1"
              x="0"
              y="0"
              width="100%"
              height="100%"
              xlink:href="@/assets/images/floor2/2.png"
          ></image>
          <image
              v-else
              x="0"
              y="0"
              width="100%"
              height="100%"
              xlink:href="@/assets/images/floor2/back.png"
          ></image>
          <rect
              width="100%"
              height="100%"
              fill-opacity="0"
              class="floor__canvas-overlay mask__overlay"
          ></rect>

          <path
              v-for="item in store.secondFloorData"
              v-tooltip="{ value: item.name,
              dt: {
                background: 'white',
                color: 'black',
                borderRadius: '20px',
              },
              }"
              :key="item.id"
              :id="item.id"
              :d="props.scene ? item.path : item.path2"
              fill="white"
              fill-opacity="0.5"
              @click="$emit('modal-open', item)"
              :class="{
              active: active && props.selectedChair?.id === item.id,
              busy: item?.isBooked,
            }"
          />
          <rect
              v-for="item in store.secondFloorData"
              :key="item.id"
              :id="item.id"
              :x="props.scene ? item.react.x : item.react.x2"
              :y="props.scene ? item.react.y : item.react.y2"
              :width="26"
              :height="26"
              :fill="
              item?.isBooked ? 'url(#pattern0_284_4)' : 'url(#pattern1_284_4)'
            "
              @click="$emit('modal-open', item)"
          />
          <defs>
            <pattern
                id="pattern0_284_4"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
            >
              <use xlink:href="#image0_284_4" transform="scale(0.00195312)"/>
            </pattern>
            <pattern
                id="pattern1_284_4"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
            >
              <use xlink:href="#image1_284_4" transform="scale(0.00195312)"/>
            </pattern>
            <image
                id="image0_284_4"
                width="512"
                height="512"
                xlink:href="@/assets/images/lock.svg"
            />
            <image
                id="image1_284_4"
                width="512"
                height="512"
                xlink:href="@/assets/images/add.svg"
            />
          </defs>
        </svg>
      </div>
    </div>
  </div>
</template>
