import Vue from 'vue'

/** UI component common definition */
export declare class UIComponent extends Vue {
  /** Install component into Vue */
  static install (vue: typeof Vue): void
}

/** Component size definition for button, input, etc */
export type UIComponentSize = 'large' | 'medium' | 'small' | 'mini'

/** Horizontal alignment */
export type UIHorizontalAlignment = 'left' | 'center' | 'right'
