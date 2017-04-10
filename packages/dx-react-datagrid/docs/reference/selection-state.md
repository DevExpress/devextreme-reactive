# SelectionState Plugin Reference

Plugin that manages selection state.

## User Reference

### Dependencies

none

### Properties

Name | Type | Default | Description
-----|------|---------|------------
selection | array&lt;int&#124;string&gt; | [] | Specifies selected rows
defaultSelection | array&lt;int&#124;string&gt; | [] | Specifies starting selected rows for uncontrolled scenario
selectionChange | (selection: array&lt;int&#124;string&gt;) => void | | Handles selection change
