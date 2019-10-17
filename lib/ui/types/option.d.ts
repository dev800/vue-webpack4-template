import { UIComponent } from './component'

/** Dropdown Select Option Component */
export declare class UIOption extends UIComponent {
  /** Value of option */
  value: any

  /** Label of option, same as value if omitted */
  label: string

  /** Whether option is disabled */
  disabled: boolean
}
