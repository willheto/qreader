declare class QReader {
    private videoElement;
    latestScan: string | null;
    private delayBetweenScans;
    isCameraActive: boolean;
    isScanningPaused: boolean;
    private onScan;
    constructor(videoElement: HTMLVideoElement, onScan: (data: string) => void, options?: {
        delayBetweenScans?: number;
    });
    private startCamera;
    pauseScanning(): Promise<void>;
    resumeScanning(): Promise<void>;
    destroyInstance(): Promise<void>;
    private initQrScanner;
}
export default QReader;
//# sourceMappingURL=qreader.d.ts.map