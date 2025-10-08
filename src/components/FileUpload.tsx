import { Upload, Loader2, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface FileUploadProps {
  onFileLoaded: (content: string) => void;
}

export const FileUpload = ({ onFileLoaded }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState('');

  const handleFile = async (file: File) => {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      alert('Please upload a CSV file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStage('Reading file...');

    const reader = new FileReader();
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const progress = (e.loaded / e.total) * 30;
        setUploadProgress(progress);
      }
    };

    reader.onload = async (e) => {
      const content = e.target?.result as string;

      setUploadProgress(30);
      setUploadStage('Parsing CSV data...');
      await new Promise(resolve => setTimeout(resolve, 500));

      setUploadProgress(50);
      setUploadStage('Analyzing listings...');
      await new Promise(resolve => setTimeout(resolve, 500));

      setUploadProgress(70);
      setUploadStage('Computing ML features...');
      await new Promise(resolve => setTimeout(resolve, 600));

      setUploadProgress(85);
      setUploadStage('Generating insights...');
      await new Promise(resolve => setTimeout(resolve, 400));

      setUploadProgress(100);
      setUploadStage('Complete!');
      await new Promise(resolve => setTimeout(resolve, 300));

      onFileLoaded(content);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-950 to-blue-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-64 h-64 bg-purple-500/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>

        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl w-full relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full shadow-2xl border border-cyan-500/30">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-500/50"></div>
              <span className="text-sm font-semibold text-white tracking-wider">AIRBNB360 PLATFORM</span>
            </div>
          </div>
          <h1 className="text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            AI-Powered Airbnb
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-pulse">
              Intelligence Platform
            </span>
          </h1>
          <p className="text-cyan-100 text-xl max-w-2xl mx-auto backdrop-blur-sm">
            NLP • Geospatial Analysis • Anomaly Detection • Forecasting • Trust Scores
          </p>

          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-cyan-300 text-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>Upload</span>
            </div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400"></div>
            <div className="flex items-center gap-2 text-cyan-300 text-sm">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>Clean</span>
            </div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400"></div>
            <div className="flex items-center gap-2 text-cyan-300 text-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>AI Enrichment</span>
            </div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></div>
            <div className="flex items-center gap-2 text-cyan-300 text-sm">
              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              <span>Insights</span>
            </div>
          </div>
        </div>

        <div
          className={`border-2 border-dashed rounded-3xl p-16 text-center transition-all duration-300 backdrop-blur-2xl ${
            isDragging
              ? 'border-cyan-400 bg-white/20 scale-105 shadow-cyan-500/50'
              : 'border-cyan-500/30 bg-white/10 hover:border-cyan-400 hover:bg-white/20'
          } shadow-2xl hover:shadow-cyan-500/20`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <div className={`p-6 rounded-full mb-6 transition-all duration-300 ${
              isDragging
                ? 'bg-gradient-to-br from-cyan-400/30 to-blue-400/30 scale-110 shadow-2xl shadow-cyan-500/50'
                : 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl'
            } border border-cyan-400/30`}>
              <Upload className={`w-16 h-16 transition-colors ${
                isDragging ? 'text-cyan-300' : 'text-cyan-100'
              }`} />
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">
              Drop your CSV file here
            </h3>
            <p className="text-cyan-200 text-lg mb-8">
              or click below to browse from your computer
            </p>

            <label className="cursor-pointer group">
              <input
                type="file"
                accept=".csv"
                onChange={handleChange}
                className="hidden"
              />
              <span className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white rounded-2xl font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 shadow-lg hover:scale-105 border border-cyan-400/30">
                <Upload className="w-5 h-5" />
                Select CSV File
              </span>
            </label>

            {!isUploading && (
              <div className="mt-8 flex items-center gap-6 text-sm text-cyan-200 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-500/50"></div>
                  <span>Secure Upload</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50"></div>
                  <span>AI Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-500/50"></div>
                  <span>ML Insights</span>
                </div>
              </div>
            )}

            {isUploading && (
              <div className="mt-8 w-full max-w-md mx-auto backdrop-blur-xl bg-white/10 rounded-2xl p-6 border border-cyan-400/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-cyan-100">{uploadStage}</span>
                  <span className="text-sm font-bold text-cyan-300">{Math.round(uploadProgress)}%</span>
                </div>
                <div className="h-3 bg-slate-900/50 rounded-full overflow-hidden border border-cyan-500/30">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all duration-500 relative shadow-lg shadow-cyan-500/50"
                    style={{ width: `${uploadProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-50 blur-sm"></div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-cyan-200">
                  {uploadProgress < 100 ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
                      <span>Processing your data with AI...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-400 animate-pulse" />
                      <span className="text-green-300 font-semibold">Upload successful!</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
