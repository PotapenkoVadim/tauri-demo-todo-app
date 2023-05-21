// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs::{OpenOptions, write};
use serde::{Serialize, Deserialize};
use serde_json::{from_reader, to_string_pretty, json};

const DATA_BASE: &str = "data.json";

#[derive(Serialize, Deserialize, Debug)]
struct Todo {
    id: u128,
    label: String,
    checked: bool
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_todos() -> String {
    let mut todos: Vec<Todo> = vec![];
    let file = OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open(DATA_BASE)
        .unwrap();

    if !is_file_empty(DATA_BASE) {
        todos = from_reader(file).unwrap();
    }

    json!(todos).to_string()
}

#[tauri::command]
fn add_todo(todo: Todo) -> String {
    let mut todos: Vec<Todo> = vec![];
    let file = OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open(DATA_BASE)
        .unwrap();

    if !is_file_empty(DATA_BASE) {
        todos = from_reader(&file).unwrap();
    }

    todos.push(todo);
    write(DATA_BASE, to_string_pretty(&todos).unwrap())
        .unwrap();

    json!(todos).to_string()
}

#[tauri::command]
fn set_check(todo_id: String) -> String {
    let id = todo_id.parse::<u128>().unwrap();
    let mut todos: Vec<Todo> = vec![];
    let file = OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open(DATA_BASE)
        .unwrap();

    if !is_file_empty(DATA_BASE) {
        todos = from_reader(&file).unwrap();
        let index = todos
            .iter()
            .position(|item| item.id == id)
            .unwrap();

        todos[index].checked = true;

        write(DATA_BASE, to_string_pretty(&todos).unwrap())
            .unwrap();
    }

    json!(todos).to_string()
}

#[tauri::command]
fn clear_all() -> String {
    let todos: Vec<Todo> = vec![];

    if !is_file_empty(DATA_BASE) {
        write(DATA_BASE, to_string_pretty(&todos).unwrap())
            .unwrap();
    }

    json!(todos).to_string()
}

fn is_file_empty(file_path: &str) -> bool {
    match std::fs::metadata(file_path) {
        Ok(metadata) => metadata.len() == 0,
        Err(_) => true,
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_todos, add_todo, set_check, clear_all])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
