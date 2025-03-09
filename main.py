import webview
import subprocess
import os
import pam
import sys
import time
import tkinter as tk  # For Screen Resolution Detection

# import archinstall
# import pathlib
# import json

# Function to find a free TTY dynamically
def find_free_tty():
    used_ttys = subprocess.getoutput("who").split("\n")
    used_ttys = [line.split()[1] for line in used_ttys if line]  # Extract active TTYs
    for i in range(2, 10):  # Check tty2 to tty9
        if f"tty{i}" not in used_ttys:
            return i
    return 1  # Fallback to tty1

# Find a free Xorg display
display_num = 0 if not os.path.exists("/tmp/.X0-lock") else 1
free_tty = find_free_tty()

# Start Xorg dynamically
os.system(f"Xorg :{display_num} vt{free_tty} -nolisten tcp &")
time.sleep(2)

# Set DISPLAY environment variable
os.environ["DISPLAY"] = f":{display_num}"

xsessions = "/usr/share/xsessions"
waylandsessions = "/usr/share/wayland-sessions"
session_dirs = [xsessions, waylandsessions]

class Api:
    def __init__(self):
        self.selected_session = None  # Initialize selected session

    def test_func(self):
        print("bruh")

    def get_sessions(self):
        sessions = {}

        for directory in session_dirs:
            if os.path.exists(directory):
                for file in os.listdir(directory):
                    if file.endswith(".desktop"):
                        with open(os.path.join(directory, file), "r") as f:
                            name, cmd = None, None
                            for line in f:
                                if line.startswith("Name="):
                                    name = line.strip().split("=", 1)[1]
                                elif line.startswith("Exec="):
                                    cmd = line.strip().split("=", 1)[1]
                                if name and cmd:
                                    break

                        if name and cmd:
                            sessions[name] = cmd

        return sessions

    def select_session(self, name):
        self.selected_session = name  # Store selected session

    def auth_user(self, username, password):
        return pam.authenticate(username, password)

    def start_session(self, username):
        if not self.selected_session:
            print("No session selected")
            return

        sessions = self.get_sessions()
        session_cmd = sessions.get(self.selected_session)

        if not session_cmd:
            print(f"Invalid session: {self.selected_session}")
            return

        print(f"Starting session: {self.selected_session} for {username}")

        # xinit_file = open('~/.azuloginXINIT', 'x')
        # xinit_file.write(f"exec {session_cmd}")
        # xinit_file.close()
        # os.system('chmod +x ~/.azuloginXINIT')
        # os.system('startx ~/.azuloginXINIT')
        os.system(f"sudo -u {username} setsid {session_cmd} &")  # Use setsid to detach session
        # os.system(f'sudo -u {username} {session_cmd}')
        sys.exit()

root = tk.Tk()
displayWidth = root.winfo_screenwidth()
displayHeight = root.winfo_screenheight()

print("Starting AzuLogin")

# Instantiate Api class
api = Api()

webview.settings = {
    "ALLOW_FILE_URLS": True,
    "ALLOW_DOWNLOADS": True,
    "OPEN_DEVTOOLS_IN_DEBUG": False,
}

webview.create_window('AzuLogin', url="assets/index.html", background_color='#000000', js_api=api, fullscreen=True, width=displayWidth, height=displayHeight)

# webview.create_window("AzuLogin", url="assets/index.html", background_color="#000000", js_api=api, width=1280, height=720)

webview.start(gui="qt", debug=True)
