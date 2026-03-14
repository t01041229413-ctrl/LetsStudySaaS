import os
import sys

# 프로젝트 루트 경로를 system path에 추가
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
