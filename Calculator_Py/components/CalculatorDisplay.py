import tkinter as tk
from tkinter import StringVar

class CalculatorDisplay(tk.Frame):
    def __init__(self, master, memory_var, has_memory_var, angle_mode_var, expression_var, result_var):
        super().__init__(master, bg='#E3F2FD', padx=10, pady=10)

        self.memory_var = memory_var
        self.has_memory_var = has_memory_var
        self.angle_mode_var = angle_mode_var
        self.expression_var = expression_var
        self.result_var = result_var

        # Top Row: Memory and Angle Mode
        top_frame = tk.Frame(self, bg='#E3F2FD')
        top_frame.pack(fill='x')

        self.memory_label = tk.Label(top_frame, text="", font=("Arial", 10), fg="#1565C0", bg="#E3F2FD")
        self.memory_label.pack(side="left")

        self.angle_label = tk.Label(top_frame, text="", font=("Arial", 10), fg="#1565C0", bg="#E3F2FD")
        self.angle_label.pack(side="right")

        # Expression
        self.expression_label = tk.Label(self, text="", font=("Courier", 16), anchor="e",
                                         fg="#1565C0", bg="#E3F2FD", wraplength=400)
        self.expression_label.pack(fill="x", pady=(10, 0))

        # Result
        self.result_label = tk.Label(self, text="", font=("Courier", 28, "bold"), anchor="e",
                                     fg="#1565C0", bg="#E3F2FD", wraplength=400)
        self.result_label.pack(fill="x", pady=(5, 0))

        self.update_display()

        # Watch for variable changes
        self.memory_var.trace_add("write", lambda *args: self.update_display())
        self.has_memory_var.trace_add("write", lambda *args: self.update_display())
        self.angle_mode_var.trace_add("write", lambda *args: self.update_display())
        self.expression_var.trace_add("write", lambda *args: self.update_display())
        self.result_var.trace_add("write", lambda *args: self.update_display())

    def update_display(self):
        self.memory_label.config(text=f"M: {self.memory_var.get()}" if self.has_memory_var.get() else "")
        self.angle_label.config(text=self.angle_mode_var.get())
        self.expression_label.config(text=self.expression_var.get())
        self.result_label.config(text=self.result_var.get())
