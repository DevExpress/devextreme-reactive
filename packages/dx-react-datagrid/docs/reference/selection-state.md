# SelectionState Plugin Reference

Plugin that manages selection state.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
selection | Array&lt;int&#124;string&gt; | [] | Specifies selected rows
defaultSelection | Array&lt;int&#124;string&gt; | [] | Specifies initially selected rows for the the uncontrolled mode
onSelectionChange | (selection: Array&lt;int&#124;string&gt;) => void | | Handles selection changes
