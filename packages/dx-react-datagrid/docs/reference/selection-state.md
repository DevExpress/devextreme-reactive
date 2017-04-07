# SelectionState Plugin Reference

Plugin that manages selection state.

Dependencies: none

Properties:

Property         | Type                                            | Default Value | Description
-----------------|-------------------------------------------------|---------------|-----------------------------------------------------------
selection        | array&lt;int&#124;string&gt;                    | []            | Specifies selected rows
defaultSelection | array&lt;int&#124;string&gt;                    | []            | Specifies starting selected rows for uncontrolled scenario
selectionChange  | (filters: array&lt;int&#124;string&gt;) => void | undefined     | Handles selection change
