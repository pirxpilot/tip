PROJECT = tip
NODE_BIN=./node_modules/.bin
CSS = tip.css

all: check compile

check: lint

compile: build/build.js build/build.css build/aurora-tip.css

build:
	mkdir -p $@

build/build.js: index.js | build
	$(NODE_BIN)/esbuild \
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

lint:
	$(NODE_BIN)/biome ci

format:
	$(NODE_BIN)/biome check --fix

clean:
	rm -fr build node_modules

test: compile
	@open test/index.html

.PHONY: clean lint format check all test compile
