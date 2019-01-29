export interface CustomSummaryProps {
  /** Total summary values. */
  totalValues?: Array<any>;
  /** Group summary values. */
  groupValues?: { [key: string]: Array<any> };
  /** Tree summary values. */
  treeValues?: { [key: string]: Array<any> };
}
