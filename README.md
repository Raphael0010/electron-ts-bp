# Electron boilerplate using TypeScript

## Scripts

```python
 "scripts": {
    "dev": "electron-webpack dev",
    "postinstall": "electron-builder install-app-deps",
    "compile": "electron-webpack",
    "dist": "yarn compile && electron-builder",
    "dist:dir": "yarn dist -- --dir -c.compression=store -c.mac.identity=null"
}
```

## License
MIT
