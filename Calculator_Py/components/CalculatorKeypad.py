class CalculatorKeypad(tk.Frame):
    def __init__(self, master, on_button_click, on_equals, on_clear, on_clear_entry, on_backspace,
                 on_memory_clear, on_memory_recall, on_memory_add, on_memory_subtract):
        super().__init__(master, padx=10, pady=10)

        self.create_button_grid(on_button_click, on_equals, on_clear, on_clear_entry, on_backspace,
                                on_memory_clear, on_memory_recall, on_memory_add, on_memory_subtract)

    def add_button(self, row, col, value, display=None, btn_type='number', col_span=1, command=None):
        btn = KeypadButton(self, value=value, display=display, btn_type=btn_type,
                           col_span=col_span, command=command)
        btn.grid(row=row, column=col, columnspan=col_span, sticky="nsew", padx=2, pady=2)

    def create_button_grid(self, on_button_click, on_equals, on_clear, on_clear_entry, on_backspace,
                           on_memory_clear, on_memory_recall, on_memory_add, on_memory_subtract):
        # Basic layout structure
        layout = [
            [("C", None, "function", on_clear), ("CE", None, "function", on_clear_entry),
             ("⌫", None, "function", on_backspace), ("/", "÷", "operator", on_button_click)],
            [("7",), ("8",), ("9",), ("*", "×", "operator", on_button_click)],
            [("4",), ("5",), ("6",), ("-", "−", "operator", on_button_click)],
            [("1",), ("2",), ("3",), ("+", None, "operator", on_button_click)],
            [("+/-", "±", "function", on_button_click), ("0",), (".",), ("=", None, "equals", on_equals)],
        ]

        # Place basic and arithmetic buttons
        for row_idx, row in enumerate(layout):
            for col_idx, item in enumerate(row):
                value = item[0]
                display = item[1] if len(item) > 1 else None
                btn_type = item[2] if len(item) > 2 else 'number'
                command = item[3] if len(item) > 3 else on_button_click
                self.add_button(row_idx, col_idx, value, display, btn_type, command=command)

        # Memory function buttons
        memory_buttons = [
            ("MC", None, on_memory_clear),
            ("MR", None, on_memory_recall),
            ("M+", None, on_memory_add),
            ("M-", None, on_memory_subtract)
        ]
        for idx, (val, disp, cmd) in enumerate(memory_buttons):
            self.add_button(5, idx, val, disp, 'function', command=cmd)

        # Scientific function buttons
        sci_buttons = [
            ("sin",), ("cos",), ("tan",), ("rad",),
            ("(",), (")",), ("sqrt", "√"), ("^", "x^y"),
            ("log",), ("ln",)
        ]
        sci_start_row = 6
        for i, item in enumerate(sci_buttons):
            row = sci_start_row + i // 4
            col = i % 4
            value = item[0]
            display = item[1] if len(item) > 1 else None
            self.add_button(row, col, value, display, 'function', command=on_button_click)
