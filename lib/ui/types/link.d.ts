import { UIComponent } from './component'

/** Button type */
export type LinkType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

/** Link Component */
export declare class UILink extends UIComponent {
  /** Link type */
  type: LinkType

  /** Disable the link */
  disabled: boolean

  /** Link underline */
  underline: boolean

  /** Link icon, accepts an icon name of Element icon component */
  icon: string

  /** Link href */
  href: string

  /** Link target */
  target: string
}