export interface PurchaseListResult {
  isEdit?: Boolean
  name?: String
  isNameEmpty?: Boolean
  canUpdate?: Boolean
  id?: String
  subId?: String
  maxSectionIndexOnShelf?: any
  sections?: Array<PurchaseInfo>
}
export interface PurchaseInfo {
  isEdit?: Boolean
  name?: String
  id?: String
  subId?: String
  maxSectionIndexOnShelf?: any
  canUpdate?: Boolean
  isNameEmpty?: Boolean
}
