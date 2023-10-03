deploy:
	git checkout master
	git pull
	sh run.sh production
