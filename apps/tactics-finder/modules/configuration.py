from typing import Dict, Any, List, cast

from modules.json import json_load, json_save

CONFIGURATION_PATH = "configuration.json"


def load_configuration(path: str = CONFIGURATION_PATH) -> Dict[str, Any]:
    return cast(Dict[str, Any], json_load(path))


def save_configuration(configuration: Dict[str, Any], path: str = CONFIGURATION_PATH) -> None:
    json_save(configuration, path)


def set_field(key: str, value: Any, path: str = CONFIGURATION_PATH) -> None:
    configuration: Dict[str, Any] = load_configuration(path)

    configuration_part: Dict[str, Any] = configuration
    key_parts: List[str] = key.split(".")
    for key_part in key_parts[:-1]:
        configuration_part = configuration_part[key_part]

    key = key_parts[-1]
    if key not in configuration_part:
        raise KeyError(f"Key {key} not found in the configuration.")

    if isinstance(configuration_part[key], dict):
        raise ValueError(f"Key {key} is a dictionary, cannot assign the value.")

    new_value = type(configuration_part[key])(value)
    configuration_part[key] = new_value
    json_save(configuration, path)
