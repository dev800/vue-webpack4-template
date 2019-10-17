import Vue, {VNode} from 'vue'

export type MessageType = 'success' | 'warning' | 'info' | 'error'

/** Message Component */
export declare class UIMessageComponent extends Vue {
  /** Close the Loading instance */
  close (): void
}

export interface CloseEventHandler {
  /**
   * Triggers when a message is being closed
   *
   * @param instance The message component that is being closed
   */
  (instance: UIMessageComponent): void
}

/** Options used in Message */
export interface UIMessageOptions {
  /** Message text */
  message: string | VNode

  /** Message type */
  type?: MessageType

  /** Custom icon's class, overrides type */
  iconClass?: string

  /** Custom class name for Message */
  customClass?: string

  /** Display duration, millisecond. If set to 0, it will not turn off automatically */
  duration?: number

  /** Whether to show a close button */
  showClose?: boolean

  /** Whether to center the text */
  center?: boolean

  /** Whether message is treated as HTML string */
  dangerouslyUseHTMLString?: boolean

  /** Callback function when closed with the message instance as the parameter */
  onClose?: CloseEventHandler

  /** Set the distance to the top of viewport. Default is 20 px. */
  offset?: number
}

export interface UIMessage {
  /** Show an info message */
  (text: string): UIMessageComponent

  /** Show message */
  (options: UIMessageOptions): UIMessageComponent

  /** Show a success message */
  success (text: string): UIMessageComponent

  /** Show a success message with options */
  success (options: UIMessageOptions): UIMessageComponent

  /** Show a warning message */
  warning (text: string): UIMessageComponent

  /** Show a warning message with options */
  warning (options: UIMessageOptions): UIMessageComponent

  /** Show an info message */
  info (text: string): UIMessageComponent

  /** Show an info message with options */
  info (options: UIMessageOptions): UIMessageComponent

  /** Show an error message */
  error (text: string): UIMessageComponent

  /** Show an error message with options */
  error (options: UIMessageOptions): UIMessageComponent
}

declare module 'vue/types/vue' {
  interface Vue {
  /** Used to show feedback after an activity. The difference with Notification is that the latter is often used to show a system level passive notification. */
    $message: UIMessage
  }
}
