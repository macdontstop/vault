export interface FileUploadState {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'complete' | 'error'
  error?: string
  shareId?: string
}
