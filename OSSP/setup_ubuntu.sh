#!/bin/bash

# Exit on error
set -e

# Update & upgrade
echo "Updating system..."
sudo apt update && sudo apt upgrade -y

# Install UFW and enable it
echo "Installing and enabling UFW..."
sudo apt install ufw -y
sudo ufw enable
sudo ufw allow 'Apache Full'

# Install Apache, MySQL, PHP, and other required packages
echo "Installing Apache, MySQL, PHP and required packages..."
sudo apt install apache2 mysql-server php php-mysql libapache2-mod-php php-cli php-curl php-gd php-xml php-mbstring php-zip unzip -y

# Secure MySQL installation (non-interactive workaround)
echo "Securing MySQL..."
sudo mysql <<EOF
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'RootPassword123!';
FLUSH PRIVILEGES;
EOF

# Create WordPress database and user
echo "Setting up WordPress database and user..."
sudo mysql -u root -pRootPassword123! <<EOF
CREATE DATABASE wordpress;
CREATE USER 'wpuser'@'localhost' IDENTIFIED BY 'singi-password';
GRANT ALL PRIVILEGES ON wordpress.* TO 'wpuser'@'localhost';
FLUSH PRIVILEGES;
EOF

# Download and set up WordPress
echo "Downloading and configuring WordPress..."
cd /tmp
wget https://wordpress.org/latest.zip
unzip -o latest.zip
sudo mv wordpress /var/www/
sudo chown -R www-data:www-data /var/www/wordpress
sudo chmod -R 755 /var/www/wordpress

# Create Apache site config
echo "Creating Apache configuration for WordPress..."
sudo bash -c 'cat > /etc/apache2/sites-available/wordpress.conf <<EOF
<VirtualHost *:80>
    ServerAdmin admin@localhost
    DocumentRoot /var/www/wordpress
    ServerName localhost

    <Directory /var/www/wordpress>
        AllowOverride All
        DirectoryIndex index.php
        Require all granted
    </Directory>

    ErrorLog \${APACHE_LOG_DIR}/error.log
    CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
EOF'

# Enable the WordPress site and necessary Apache modules
echo "Enabling site and Apache modules..."
sudo a2ensite wordpress
sudo a2enmod rewrite
sudo systemctl reload apache2

echo "WordPress installation complete. Visit http://localhost or http://<your-ip> to continue setup."
