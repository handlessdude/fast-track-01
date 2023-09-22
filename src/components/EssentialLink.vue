<template>
  <q-item v-ripple clickable :to="{ name: routeName }">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-weight-bold">{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { RouteName } from 'src/router/route-name';

export interface EssentialLinkProps {
  title: string;
  caption?: string;
  routeName: RouteName;
  icon?: string;
}
defineProps<EssentialLinkProps>();
</script>
