import { UIComponent } from './component'

/** Use Collapse to store contents. */
export declare class UICollapse extends UIComponent {
  /** Whether to activate accordion mode */
  accordion: boolean

  /** Currently active panel */
  value: string | number | string[] | number[]
}
