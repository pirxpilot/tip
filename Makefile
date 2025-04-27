PROJECT = tip
CSS = tip.css

compile: build/build.js build/build.css build/aurora-tip.css

build:
	mkdir -p $@

build/build.js: index.js | build node_modules
	esbuild \
		--bundle $< \
		--define:DEBUG=true \
		--global-name=Tip \
		--sourcemap \
		--outfile=$@

build/build.css: $(CSS) | build
	cat $^ > $@

build/aurora-tip.css: | build
	curl \
		--compressed \
		--output $@ \
		https://raw.githubusercontent.com/component/aurora-tip/master/aurora-tip.css

node_modules: package.json
	yarn
	touch $@

clean:
	rm -fr build node_modules

test: build build/build.css build/aurora-tip.css
	@open test/index.html

.PHONY: clean test compile

check: lint

lint:
	./node_modules/.bin/biome ci

format:
	./node_modules/.bin/biome check --fix

.PHONY: check format lint
