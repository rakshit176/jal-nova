#!/bin/bash

# Jalnova Admin Access Shortcut
# This script provides quick access to the admin dashboard

echo "🌊 JALNOVA - Admin Access 🌊"
echo "================================"
echo ""
echo "🔐 Admin Panel URLs:"
echo "   Dashboard: http://localhost:3000/admin/dashboard"
echo "   Login:     http://localhost:3000/admin/login"
echo ""
echo "📋 Admin Credentials:"
echo "   Username: admin"
echo "   Password: jalnova123"
echo ""
echo "🚀 Opening admin dashboard in your browser..."

# Detect the operating system and open the browser
case "$(uname -s)" in
   Darwin*)  open "http://localhost:3000/admin/login" ;;  # macOS
   Linux*)   if command -v xdg-open > /dev/null; then
                xdg-open "http://localhost:3000/admin/login"
             else
                echo "Please manually open: http://localhost:3000/admin/login"
             fi ;;
   CYGWIN*|MINGW*|MSYS*) start "http://localhost:3000/admin/login" ;;  # Windows
   *)        echo "Please manually open: http://localhost:3000/admin/login" ;;
esac

echo ""
echo "✅ Admin access initiated!"
echo "💧 Remember: Pure Water, Pure Management!"