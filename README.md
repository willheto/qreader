# QReader - Typescript QR Code Scanner

QReader is a JavaScript library that provides an easy-to-use QR code scanner using a video element. It allows you to integrate QR code scanning functionality into web applications with minimal setup.

Note! This library is in a very early development stage, and may contain bugs.

## Installation

You can install QReader via npm:

```bash
npm install qreader
```

## Usage

```bash
import QReader from 'qreader';

// Assuming you have a <video> element in your HTML
const videoElement = document.createElement('video');
document.body.appendChild(videoElement);

const qreader = new QReader(videoElement, onScanCallback);

function onScanCallback(data) {
    console.log('QR Code scanned:', data);
    // Handle the scanned QR code data here
}

// Start scanning
qreader.resumeScanning();

// Pause scanning
// qreader.pauseScanning();

// Destroy instance when done
// qreader.destroyInstance();
```

## Constructor

```bash
import QReader from 'qreader';

const qreader = new QReader(videoElement, onScan, options?);
```

## Methods

| Method              | Description                                        |
| ------------------- | -------------------------------------------------- |
| `pauseScanning()`   | Pauses QR code scanning.                           |
| `resumeScanning()`  | Resumes QR code scanning.                          |
| `destroyInstance()` | Stops the QR code scanner and cleans up resources. |

## Properties

| Property           | Type             | Description                                                                             |
| ------------------ | ---------------- | --------------------------------------------------------------------------------------- |
| `latestScan`       | `string \| null` | Contains the latest scanned QR code data, or `null` if no QR code has been scanned yet. |
| `isCameraActive`   | `boolean`        | Indicates whether the camera is actively scanning for QR codes.                         |
| `isScanningPaused` | `boolean`        | Indicates whether the scanning process is currently paused.                             |
