import Vue, { PluginObject } from 'vue'
import { UIComponent, UIComponentSize, UIHorizontalAlignment } from './component'

import { UIAlert } from './alert'
import { UIAside } from './aside'
import { UIAutocomplete } from './autocomplete'
import { UIBadge } from './badge'
import { UIBreadcrumb } from './breadcrumb'
import { UIBreadcrumbItem } from './breadcrumb-item'
import { UIButton } from './button'
import { UIButtonGroup } from './button-group'
import { UICard } from './card'
import { UICarousel } from './carousel'
import { UICarouselItem } from './carousel-item'
import { UICascader } from './cascader'
import { UICheckbox } from './checkbox'
import { UICheckboxButton } from './checkbox-button'
import { UICheckboxGroup } from './checkbox-group'
import { UICol } from './col'
import { UICollapse } from './collapse'
import { UICollapseItem } from './collapse-item'
import { UIColorPicker } from './color-picker'
import { UIContainer } from './container'
import { UIDatePicker } from './date-picker'
import { UIDialog } from './dialog'
import { UIDropdown } from './dropdown'
import { UIDropdownItem } from './dropdown-item'
import { UIDropdownMenu } from './dropdown-menu'
import { UIFooter } from './footer'
import { UIForm } from './form'
import { UIFormItem } from './form-item'
import { UIHeader } from './header'
import { UIInput } from './input'
import { UIInputNumber } from './input-number'
import { UILoading } from './loading'
import { UIMain } from './main'
import { UIMenu } from './menu'
import { UIMenuItem } from './menu-item'
import { UIMenuItemGroup } from './menu-item-group'
import { UIMessage } from './message'
import { UIMessageBox } from './message-box'
import { UINotification } from './notification'
import { UIOption } from './option'
import { UIOptionGroup } from './option-group'
import { UIPagination } from './pagination'
import { UIPopover } from './popover'
import { UIProgress } from './progress'
import { UIRate } from './rate'
import { UIRadio } from './radio'
import { UIRadioButton } from './radio-button'
import { UIRadioGroup } from './radio-group'
import { UIRow } from './row'
import { UISelect } from './select'
import { UISlider } from './slider'
import { UIStep } from './step'
import { UISteps } from './steps'
import { UISubmenu } from './submenu'
import { UISwitch } from './switch'
import { UITable } from './table'
import { UITableColumn } from './table-column'
import { UITag } from './tag'
import { UITabs } from './tabs'
import { UITabPane } from './tab-pane'
import { UITimeline } from './timeline'
import { UITimelineItem } from './timeline-item'
import { UITimePicker } from './time-picker'
import { UITimeSelect } from './time-select'
import { UITooltip } from './tooltip'
import { UITransfer } from './transfer'
import { UITree, TreeData } from './tree'
import { UIUpload } from './upload'
import { UILink } from './link'
import { UIDivider } from './divider'
import { UIIcon } from './icon'
import { UICalendar } from './calendar'
import { UIImage } from './image'
import { UIBacktop } from './backtop'
import { UIInfiniteScroll } from './infinite-scroll'
import { UIPageHeader } from './page-header'
import { UIAvatar } from './avatar'
import { UIDrawer } from './drawer'

export interface InstallationOptions {
  locale: any,
  i18n: any,
  size: string
}

/** The version of element-ui */
export const version: string

/**
 * Install all element-ui components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(UI)` to install.
 */
export function install (vue: typeof Vue, options: InstallationOptions): void

/** UI component common definition */
export type Component = UIComponent

/** Component size definition for button, input, etc */
export type ComponentSize = UIComponentSize

/** Horizontal alignment */
export type HorizontalAlignment = UIHorizontalAlignment

/** Show animation while loading data */
export const Loading: UILoading

/** Used to show feedback after an activity. The difference with Notification is that the latter is often used to show a system level passive notification. */
export const Message: UIMessage

/** A set of modal boxes simulating system message box, mainly for message prompt, success tips, error messages and query information */
export const MessageBox: UIMessageBox

/** Displays a global notification message at the upper right corner of the page */
export const Notification: UINotification

// TS cannot merge imported class with namespace, so declare subclasses instead

/** Alert Component */
export class Alert extends UIAlert {}

/** Aside Component */
export class Aside extends UIAside {}

/** Autocomplete Component */
export class Autocomplete extends UIAutocomplete {}

/** Bagde Component */
export class Badge extends UIBadge {}

/** Breadcrumb Component */
export class Breadcrumb extends UIBreadcrumb {}

/** Breadcrumb Item Component */
export class BreadcrumbItem extends UIBreadcrumbItem {}

/** Button Component */
export class Button extends UIButton {}

/** Button Group Component */
export class ButtonGroup extends UIButtonGroup {}

/** Card Component */
export class Card extends UICard {}

/** Cascader Component */
export class Cascader extends UICascader {}

/** Carousel Component */
export class Carousel extends UICarousel {}

/** Carousel Item Component */
export class CarouselItem extends UICarouselItem {}

/** Checkbox Component */
export class Checkbox extends UICheckbox {}

/** Checkbox Button Component */
export class CheckboxButton extends UICheckboxButton {}

/** Checkbox Group Component */
export class CheckboxGroup extends UICheckboxGroup {}

/** Colunm Layout Component */
export class Col extends UICol {}

/** Collapse Component */
export class Collapse extends UICollapse {}

/** Collapse Item Component */
export class CollapseItem extends UICollapseItem {}

/** Color Picker Component */
export class ColorPicker extends UIColorPicker {}

/** Container Component */
export class Container extends UIContainer {}

/** Date Picker Component */
export class DatePicker extends UIDatePicker {}

/** Dialog Component */
export class Dialog extends UIDialog {}

/** Dropdown Component */
export class Dropdown extends UIDropdown {}

/** Dropdown Item Component */
export class DropdownItem extends UIDropdownItem {}

/** Dropdown Menu Component */
export class DropdownMenu extends UIDropdownMenu {}

/** Footer Component */
export class Footer extends UIFooter {}

/** Form Component */
export class Form extends UIForm {}

/** Form Item Component */
export class FormItem extends UIFormItem {}

/** Header Component */
export class Header extends UIHeader {}

/** Input Component */
export class Input extends UIInput {}

/** Input Number Component */
export class InputNumber extends UIInputNumber {}

/** Main Component */
export class Main extends UIMain {}

/** Menu that provides navigation for your website */
export class Menu extends UIMenu {}

/** Menu Item Component */
export class MenuItem extends UIMenuItem {}

/** Menu Item Group Component */
export class MenuItemGroup extends UIMenuItemGroup {}

/** Dropdown Select Option Component */
export class Option extends UIOption {}

/** Dropdown Select Option Group Component */
export class OptionGroup extends UIOptionGroup {}

/** Pagination Component */
export class Pagination extends UIPagination {}

/** Popover Component */
export class Popover extends UIPopover {}

/** Progress Component */
export class Progress extends UIProgress {}

/** Rate Component */
export class Rate extends UIRate {}

/** Radio Component */
export class Radio extends UIRadio {}

/** Radio Button Component */
export class RadioButton extends UIRadioButton {}

/** Radio Group Component */
export class RadioGroup extends UIRadioGroup {}

/** Row Layout Component */
export class Row extends UIRow {}

/** Dropdown Select Component */
export class Select extends UISelect {}

/** Slider Component */
export class Slider extends UISlider {}

/** Step Component */
export class Step extends UIStep {}

/** Steps Component */
export class Steps extends UISteps {}

/** Submenu Component */
export class Submenu extends UISubmenu {}

/** Switch Component */
export class Switch extends UISwitch {}

/** Table Component */
export class Table extends UITable {}

/** Table Column Component */
export class TableColumn extends UITableColumn {}

/** Tabs Component */
export class Tabs extends UITabs {}

/** Tab Pane Component */
export class TabPane extends UITabPane {}

/** Tag Component */
export class Tag extends UITag {}

/** Timeline Component */
export class Timeline extends UITimeline {}

/** Timeline Item Component */
export class TimelineItem extends UITimelineItem {}

/** TimePicker Component */
export class TimePicker extends UITimePicker {}

/** TimeSelect Component */
export class TimeSelect extends UITimeSelect {}

/** Tooltip Component */
export class Tooltip extends UITooltip {}

/** Transfer Component */
export class Transfer extends UITransfer {}

/** Tree Component */
export class Tree<K = any, D = TreeData> extends UITree<K, D> {}

/** Upload Component */
export class Upload extends UIUpload {}

/** Divider Component */
export class Divider extends UIDivider {}

/** Link Component */
export class Link extends UILink {}

/** Image Component */
export class Image extends UIImage {}

/** Icon Component */
export class Icon extends UIIcon {}

/** Calendar Component */
export class Calendar extends UICalendar {}

/** Backtop Component */
export class Backtop extends UIBacktop {}

/** InfiniteScroll Directive */
export const InfiniteScroll: PluginObject<UIInfiniteScroll>;

/** PageHeader Component */
export class PageHeader extends UIPageHeader {}

/** Avatar Component */
export class Avatar extends UIAvatar {}

/** Drawer Component */
export class Drawer extends UIDrawer {}
