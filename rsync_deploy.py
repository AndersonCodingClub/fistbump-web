import os
import subprocess
from dotenv import load_dotenv


load_dotenv(os.path.abspath(os.path.join(os.path.abspath(os.path.curdir), 'config.env')))

def transfer_files(target_dir: str) -> None:
    """Automatically transfer current toodoo code to external server via rsync


    Args:
        target_dir (str): Directory on remote server to write to
    """
    try:
        server_address = os.environ['AWS_SERVER_ADDRESS']
        key_path = os.environ['AWS_KEY_PATH']
        curr_path = os.path.abspath(os.curdir)+'/'.replace('//', '/')
        sudo_password = os.environ['password']
        
        command_root = f"echo '{sudo_password}' | sudo -S rsync -avz"
        exclude_info = "--exclude='.git/' --exclude='test_client.py' --exclude='.DS_Store' --exclude='.gitignore' --exclude='__pycache__/' --exclude='rsync_deploy.py'"
        rsync_info = f"-e 'ssh -i {key_path}' {curr_path} ubuntu@{server_address}:~/{target_dir}"
        full_command = ' '.join([command_root, exclude_info, rsync_info])
        
        sp = subprocess.Popen(full_command, shell=True)
        sp.wait()
        sp.terminate()
    except Exception as e:
        print(e)
        
if __name__ == '__main__':
    target_dir = 'fistbump_v1'
    transfer_files(target_dir)