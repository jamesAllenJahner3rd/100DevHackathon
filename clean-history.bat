@echo off
echo Creating backup...
cd ..
xcopy /E /I refrigerator refrigerator_backup

echo Cleaning repository...
cd refrigerator
echo ***REMOVED*** > replacements.txt
git filter-repo --replace-text replacements.txt

echo Updating remote repository...
git remote add origin https://github.com/jamesAllenJahner3rd/100DevHackathon.git
git push origin --force --all

echo Cleanup complete!
del replacements.txt