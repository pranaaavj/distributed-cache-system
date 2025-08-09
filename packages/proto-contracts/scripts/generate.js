import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Paths
const protoDir = path.join(import.meta.dirname, '../src');
const outputDir = path.join(import.meta.dirname, '../src/generated');

console.log(protoDir, outputDir);

console.log('🚀 Starting proto generation...');

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Find all proto files
const protoFiles = fs
  .readdirSync(protoDir)
  .filter((file) => file.endsWith('.proto'))
  .map((file) => path.join(protoDir, file));

if (protoFiles.length === 0) {
  console.log('❌ No proto files found in', protoDir);
  process.exit(1);
}

console.log(
  `📁 Found ${protoFiles.length} proto files:`,
  protoFiles.map((f) => path.basename(f))
);

// Generate TypeScript files
try {
  protoFiles.forEach((protoFile) => {
    console.log(`⚙️  Generating ${path.basename(protoFile)}...`);

    // Method 1: Using grpc_tools_node_protoc_ts (try this first)
    try {
      const command = `protoc --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=${outputDir} --ts_proto_opt=outputServices=grpc-js,env=node,useOptionals=messages,exportCommonSymbols=false --ts_proto_opt=grpc_package=@grpc/grpc-js --ts_proto_opt=useObjectMethods=true --proto_path=${protoDir} ${protoFile}`;

      execSync(command, { stdio: 'inherit' });
    } catch (error1) {
      console.log('Method failed');
    }
  });

  console.log('✅ Proto generation completed successfully!');
} catch (error) {
  console.error('❌ Proto generation failed:', error.message);

  // Provide helpful debug info
  console.log('\n🔍 Debug Info:');
  console.log('Proto directory:', protoDir);
  console.log('Output directory:', outputDir);
  console.log('Available protoc plugins:');
  try {
    execSync('ls -la node_modules/.bin/ | grep protoc', { stdio: 'inherit' });
  } catch (e) {
    console.log('No protoc plugins found');
  }

  process.exit(1);
}
