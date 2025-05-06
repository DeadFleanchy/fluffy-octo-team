import tkinter as tk

class DarkModeToggle(tk.Frame):
    def __init__(self, master, on_toggle, is_dark=False):
        super().__init__(master)

        self.is_dark = tk.BooleanVar(value=is_dark)
        self.on_toggle = on_toggle

        self.sun_icon = tk.Label(self, text="🌞", font=("Arial", 12))
        self.switch = tk.Checkbutton(self, variable=self.is_dark, command=self.toggle_theme)
        self.moon_icon = tk.Label(self, text="🌜", font=("Arial", 12))

        self.sun_icon.pack(side=tk.LEFT, padx=5)
        self.switch.pack(side=tk.LEFT)
        self.moon_icon.pack(side=tk.LEFT, padx=5)

    def toggle_theme(self):
        dark_mode_enabled = self.is_dark.get()
        self.on_toggle(dark_mode_enabled)
