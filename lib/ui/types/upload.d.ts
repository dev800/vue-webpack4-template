import { UIComponent } from './component'

export type ListType = 'text' | 'picture' | 'picture-card'
export type FileUploadStatus = 'ready' | 'uploading' | 'success' | 'fail'

export interface FileListItem {
  name: string,
  url: string,
  status?: FileUploadStatus
}

export interface UIUploadInternalRawFile extends File {
  uid: number
}

export interface UIUploadInternalFileDetail {
  status: FileUploadStatus,
  name: string,
  size: number,
  percentage: number,
  uid: number,
  raw: UIUploadInternalRawFile,
  url?: string
}

export interface UIUploadProgressEvent extends ProgressEvent {
  percent: number
}

export interface HttpRequestOptions {
  headers: object,
  withCredentials: boolean,
  file: File,
  data: object,
  filename: string,
  action: string,
  onProgress: (e: UIUploadProgressEvent) => void,
  onSuccess: (response: any) => void,
  onError: (err: ErrorEvent) => void
}

/** Upload Component */
export declare class UIUpload extends UIComponent {
  /** Request URL (required) */
  action: string

  /** Request headers */
  headers: object

  /** Whether uploading multiple files is permitted */
  multiple: boolean

  /** Additions options of request */
  data: object

  /** Key name for uploaded file */
  name: string

  /** Whether cookies are sent */
  withCredentials: boolean

  /** Whether to show the uploaded file list */
  showFileList: boolean

  /** Whether to activate drag and drop mode */
  drag: boolean

  /** Accepted file types, will not work when thumbnail-mode is true */
  accept: string

  /** Hook function when clicking the uploaded files */
  onPreview: (file: UIUploadInternalFileDetail) => void

  /** Hook function when files are removed */
  onRemove: (file: UIUploadInternalFileDetail, fileList: UIUploadInternalFileDetail[]) => void

  /** Hook function when uploaded successfully */
  onSuccess: (response: any, file: UIUploadInternalFileDetail, fileList: UIUploadInternalFileDetail[]) => void

  /** Hook function when some errors occurs */
  onError: (err: ErrorEvent, file: UIUploadInternalFileDetail, fileList: UIUploadInternalFileDetail[]) => void

  /** Hook function when some progress occurs */
  onProgress: (event: UIUploadProgressEvent, file: UIUploadInternalFileDetail, fileList: UIUploadInternalFileDetail[]) => void

  /** Hook function when file status change */
  onChange: (file: UIUploadInternalFileDetail, fileList: UIUploadInternalFileDetail[]) => void

  /** Hook function before uploading with the file to be uploaded as its parameter. If false or a Promise is returned, uploading will be aborted */
  beforeUpload: (file: UIUploadInternalRawFile) => boolean | Promise<File | Blob | boolean>

  /** Whether thumbnail is displayed */
  thumbnailMode: boolean

  /** Default uploaded files */
  fileList: FileListItem[]

  /** Type of fileList */
  listType: ListType

  /** Whether to auto upload file */
  autoUpload: boolean

  /** Override default xhr behavior, allowing you to implement your own upload-file's request */
  httpRequest: (options: HttpRequestOptions) => void

  /** Whether to disable upload */
  disabled: boolean

  /** Maximum number of uploads allowed */
  limit: number

  /** Hook function when limit is exceeded */
  onExceed: (file: UIUploadInternalFileDetail, fileList: UIUploadInternalFileDetail[]) => void

  /** Clear the upload file list */
  clearFiles (): void;

  /** Abort specified file */
  abort (file: UIUploadInternalFileDetail): void

  /** Upload the file list manually */
  submit ():void;
}
