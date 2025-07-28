# Taiwan Bike Tour MCP Server

This project includes a Model Context Protocol (MCP) server that provides AI-accessible tools for the Taiwan Bike Tour data. The server is built using Vercel's `mcp-adapter` and runs as a Next.js API route.

## Server Status

✅ **MCP Server Running**: `http://localhost:3000/api/mcp`

## Available Tools

### 1. `get_tour_info`
Get basic information about the Taiwan Bike Tour
- **Parameters**: None
- **Returns**: Tour overview including dates, route, distance, elevation, and contact info

### 2. `get_daily_itinerary` 
Get detailed itinerary for a specific day
- **Parameters**: 
  - `day` (number): Day number (1-7) - optional, omit for all days
- **Returns**: Detailed information for the specified day or all days

### 3. `calculate_tour_stats`
Calculate various statistics about the tour
- **Parameters**: None
- **Returns**: Total distance, elevation, active days, and averages

### 4. `generate_booking_email`
Generate a booking email template
- **Parameters**:
  - `participantName` (string): Name of participant
  - `email` (string): Email address  
  - `specialRequests` (string, optional): Any special requirements
- **Returns**: Formatted email template

## Connection Instructions

### 🔗 Claude Desktop

Add the following to your Claude Desktop configuration file:

**Location**: `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)

```json
{
  "mcpServers": {
    "taiwan-bike-tour": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://localhost:3000/api/mcp"]
    }
  }
}
```

**Steps**:
1. Make sure your Next.js dev server is running: `npm run dev`
2. Install mcp-remote globally: `npm install -g mcp-remote`
3. Add the configuration above to your Claude Desktop config
4. Restart Claude Desktop
5. You should see "taiwan-bike-tour" appear in the MCP servers list

### 🔗 VS Code (with MCP Extensions)

#### Option 1: Using the MCP Extension for VS Code

1. Install the **MCP for VS Code** extension
2. Create or update `.vscode/mcp.json` in your project:

```json
{
  "servers": {
    "taiwan-bike-tour": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://localhost:3000/api/mcp"]
    }
  },
  "inputs": []
}
```

#### Option 2: Using VS Code Settings

Add to your VS Code `settings.json`:

```json
{
  "mcp.servers": {
    "taiwan-bike-tour": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://localhost:3000/api/mcp"],
      "description": "Taiwan Bike Tour information server"
    }
  }
}
```

#### Option 3: Using Codeium with MCP Support

If you're using Codeium or another AI assistant in VS Code that supports MCP:

```json
{
  "codeium.mcp.servers": {
    "taiwan-bike-tour": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "http://localhost:3000/api/mcp"]
    }
  }
}
```

#### Option 3: Direct HTTP Integration

For custom integrations or testing, you can directly call the MCP server:

```javascript
// Example: Get tour info
const response = await fetch('http://localhost:3000/api/mcp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    method: 'tools/call',
    params: {
      name: 'get_tour_info',
      arguments: {}
    }
  })
});
```

## Development Setup

### Prerequisites
- Node.js 18+ 
- Next.js development server running

### Start the MCP Server
```bash
# Start the Next.js development server
npm run dev

# The MCP server will be available at:
# http://localhost:3000/api/mcp
```

### Test the Server
```bash
# Run the test script
npm run test:mcp

# Or test manually with curl
curl -X POST http://localhost:3000/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"method":"tools/call","params":{"name":"get_tour_info","arguments":{}}}'
```

## Troubleshooting

### Common Issues

1. **"Server not found"**
   - Ensure `npm run dev` is running
   - Check that the server is accessible at `http://localhost:3000/api/mcp`

2. **"mcp-remote not found"**
   - Install globally: `npm install -g mcp-remote`
   - Or use npx: `npx mcp-remote http://localhost:3000/api/mcp`

3. **Claude Desktop not detecting server**
   - Restart Claude Desktop after config changes
   - Check config file syntax is valid JSON
   - Verify file location: `~/Library/Application Support/Claude/claude_desktop_config.json`

4. **VS Code extension issues**
   - Reload VS Code window (⌘+R)
   - Check VS Code extension logs
   - Verify MCP extension is installed and enabled

### Debug Mode

Enable verbose logging by setting environment variables:

```bash
# For detailed MCP logs
DEBUG=mcp:* npm run dev

# Or check server response directly
curl -v http://localhost:3000/api/mcp
```

## Architecture

The MCP server is implemented as a Next.js API route at `app/api/mcp/route.ts` using Vercel's mcp-adapter. It provides a standardized interface for AI assistants to access Taiwan Bike Tour data and functionality.

**Key Components**:
- Next.js API route handler
- MCP protocol implementation
- Tour data and statistics
- Email generation utilities
- Development testing tools
