#!/usr/bin/env node

/**
 * Simple test script to verify MCP server setup
 * Run with: node test-mcp.js
 */

async function testMcpServer() {
  const serverUrl = 'http://localhost:3000/api/mcp';
  
  console.log('🧪 Testing Taiwan Bike Tour MCP Server...');
  console.log(`📡 Server URL: ${serverUrl}`);
  
  try {
    // Test basic server availability
    const response = await fetch(serverUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/event-stream',
        'Cache-Control': 'no-cache'
      }
    });
    
    console.log(`✅ Server responded with status: ${response.status}`);
    console.log(`📋 Response headers:`, Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      console.log('🎉 MCP Server is running successfully!');
      console.log('');
      console.log('🔧 Available tools:');
      console.log('  - get_tour_info: Get basic tour information');
      console.log('  - get_daily_itinerary: Get day-specific itinerary');
      console.log('  - calculate_tour_stats: Calculate tour statistics');  
      console.log('  - generate_booking_email: Generate booking emails');
      console.log('');
      console.log('📖 See MCP_SERVER.md for integration instructions');
      console.log('');
      console.log('🔗 Claude Desktop config:');
      console.log('  Add to ~/Library/Application Support/Claude/claude_desktop_config.json:');
      console.log('  {');
      console.log('    "mcpServers": {');
      console.log('      "taiwan-bike-tour": {');
      console.log('        "command": "npx",');
      console.log(`        "args": ["-y", "mcp-remote", "${serverUrl}"]`);
      console.log('      }');
      console.log('    }');
      console.log('  }');
    } else {
      console.log('❌ Server error:', response.statusText);
    }
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    console.log('💡 Make sure the development server is running: npm run dev');
  }
}

// Only run if this script is executed directly
if (require.main === module) {
  testMcpServer();
}

module.exports = { testMcpServer };
