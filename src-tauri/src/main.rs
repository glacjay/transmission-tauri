// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::Command;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, reveal])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hi, {}!", name)
}

#[tauri::command]
fn reveal(path: &str) -> Result<(), String> {
    let output = Command::new("open")
        .arg("-R")
        .arg(path)
        .output()
        .expect(format!("failed to reveal {}", path).as_str());

    if !output.status.success() {
        return Err(format!(
            "failed to reveal {}: {}",
            path,
            String::from_utf8_lossy(&output.stderr)
        ));
    }

    Ok(())
}
