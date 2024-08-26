# scripts/modify_podfile.rb
podfile_path = File.join(__dir__, '..', 'ios', 'Podfile')

podfile_content = File.read(podfile_path)
podfile_content.gsub!(/^platform :ios, '.*'$/, "platform :ios, '17.0'\use_modular_headers!")

File.write(podfile_path, podfile_content)