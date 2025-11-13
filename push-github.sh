#!/bin/bash
# Script para fazer push para GitHub

cd /home/user/workspace

# Criar arquivo marker final
echo "Build 2025 - $(date)" > .github-marker

git add .github-marker
git commit -m "Adicionar marcador final para GitHub 2025"

# Fazer push (requer token)
git push github main --force

echo "Push completo!"
